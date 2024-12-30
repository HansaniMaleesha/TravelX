import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import CustomInput from "../../components/Input";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SignupFormData {
    username: string;
    email: string;
    password: string;
    "password-repeat": string;
}

export default function SignUp() {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormData>();

    const router = useRouter();

    const pwd = watch("password");

    const handleSignup = async (data: SignupFormData) => {
        const { email, password } = data;
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log(`User created: ${user.email}`);
            router.push("/pages/login");
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                Alert.alert("Error", "This email is already in use.");
            } else {
                Alert.alert("Error", "An error occurred. Please try again.");
            }
        }
    };

    return (
        <ImageBackground
            source={require("../../assets/images/background.jpg")} // Replace with your background image path
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.title}>Create an account</Text>

                    <CustomInput
                        name="username"
                        control={control}
                        placeholder="Username"
                        rules={{
                            required: "Username is required",
                            minLength: { value: 3, message: "At least 3 characters" },
                            maxLength: { value: 24, message: "Max 24 characters" },
                        }}
                    />

                    <CustomInput
                        name="email"
                        control={control}
                        placeholder="Email"
                        rules={{
                            required: "Email is required",
                            pattern: { value: emailRegex, message: "Invalid email format" },
                        }}
                    />

                    <CustomInput
                        name="password"
                        control={control}
                        placeholder="Password"
                        secureTextEntry
                        rules={{
                            required: "Password is required",
                            minLength: { value: 8, message: "At least 8 characters" },
                        }}
                    />

                    <CustomInput
                        name="password-repeat"
                        control={control}
                        placeholder="Repeat Password"
                        secureTextEntry
                        rules={{
                            validate: (value: string) =>
                                value === pwd || "Passwords do not match",
                        }}
                    />

                    <Button text="Register" onPress={handleSubmit(handleSignup)} />

                    <Text style={styles.text}>
                        By registering, you confirm that you accept our
                        <Text style={styles.link}> Terms of Use</Text> and
                        <Text style={styles.link}> Privacy Policy</Text>.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        paddingHorizontal: 20,
    },
    scrollContent: {
        alignItems: "center",
        width: "100%",
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#ffffff", // Light font color
        marginBottom: 20,
        marginTop: 200,
    },
    text: {
        color: "#ffffff", // Light font color
        marginVertical: 10,
        textAlign: "center",
    },
    link: {
        color: "#FDB075",
    },
});
