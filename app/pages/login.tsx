import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    ImageBackground,
    Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/Button";
import CustomInput from "../../components/Input";
import { useForm } from "react-hook-form";
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const { width } = Dimensions.get("window");

export default function LoginPage() {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onLoginPressed = async (data) => {
        const { email, password } = data;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(`User logged in: ${user.email}`);
            router.push("/pages/Home"); // Navigate to the authenticated home page
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                alert('No user found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Incorrect password.');
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    const onLoginFacebook = () => console.warn("Login with Facebook");
    const onLoginGoogle = () => console.warn("Login with Google");
    const onLoginApple = () => console.warn("Login with Apple");

    return (
        <ImageBackground
            source={require("../../assets/images/background.jpg")} // Replace with your background image path
            style={styles.background}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <SafeAreaView style={styles.container}>
                    {/* Header */}
                    <Text style={styles.header}>Login</Text>

                    {/* Email Input */}
                    <CustomInput
                        name="email"
                        placeholder="Email"
                        control={control}
                        rules={{ required: "Email is required", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }}
                    />

                    {/* Password Input */}
                    <CustomInput
                        name="password"
                        control={control}
                        placeholder="Password"
                        secureTextEntry
                        rules={{
                            required: "Password is required",
                            minLength: { value: 6, message: "Password should be at least 6 characters" },
                        }}
                    />

                    {/* Login Button */}
                    <CustomButton text="Sign in" onPress={handleSubmit(onLoginPressed)} />

                    {/* Sign Up */}
                    <CustomButton
                        text="Don't have an account? Create one"
                        onPress={() => router.push("/pages/signup")}
                        type="TERTIARY"
                    />
                </SafeAreaView>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    scrollView: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingVertical: 20 },
    container: { flex: 1, alignItems: "center", width: "100%", paddingHorizontal: 20 },
    header: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#ffffff", // White color for header
        marginBottom: 20,
        textAlign: "center",
        marginTop: 320,
    },
});
