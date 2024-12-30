import React from "react";
import { View, Text, StatusBar, Pressable, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";

const WelcomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            {/* ImageBackground with cover resizing */}
            <ImageBackground
                source={require('../assets/images/background.jpg')} // Local image path
                style={styles.background}
                resizeMode="cover" // Ensures the image scales proportionally to fill the screen
            >
                <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 16 }}>
                    {/* Logo Section */}
                    <Animated.View
                        entering={FadeInDown.duration(200).springify()}
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 24,
                        }}
                    >

                        <Text style={{ color: "#fff", fontSize: 50, lineHeight: 100, textAlign: "center", marginTop: 30 }}>
                            Travel
                        </Text>
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 24,
                                lineHeight: 60,
                                fontStyle: "italic",
                                marginLeft: 5,
                                marginTop: 30
                            }}
                        >
                            X
                        </Text>
                    </Animated.View>

                    {/* Main Heading */}
                    <Animated.View
                        entering={FadeInDown.duration(200).delay(200).springify()}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 32,
                                fontWeight: "500",
                                lineHeight: 42,
                                textAlign: "center",
                                marginBottom: 16,
                            }}
                        >
                            Your Adventure Awaits
                        </Text>
                    </Animated.View>

                    {/* Subtext */}
                    <Animated.View
                        entering={FadeInDown.duration(200).delay(400).springify()}
                    >
                        <Text
                            style={{
                                color: "#B0B0B0",
                                fontSize: 16,
                                lineHeight: 24,
                                textAlign: "center",
                                marginBottom: 32,
                            }}
                        >
                            Find the best deals on flights, explore amazing destinations, and book your dream vacation with TravelX.
                        </Text>
                    </Animated.View>

                    {/* Button Section */}
                    <Animated.View
                        entering={FadeInDown.duration(200).delay(600).springify()}
                        style={{ alignItems: "center", marginBottom: 20 }}
                    >
                        <Pressable
                            onPress={() => router.push("/pages/login")}
                            style={{
                                backgroundColor: "#00A3E0",
                                borderRadius: 12,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 12,
                                paddingHorizontal: 24,
                                width: "70%",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}
                            >
                                Start Your Journey
                            </Text>
                        </Pressable>
                    </Animated.View>

                    {/* Footer Section */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "#005C5C",
                                fontWeight: "500",
                                fontSize: 14,
                            }}
                        >
                            Don't have an account?
                        </Text>
                        <Text
                            style={{
                                color: "#00A3E0",
                                fontWeight: "500",
                                fontSize: 14,
                                marginLeft: 5,
                            }}
                            onPress={() => {
                                router.push("/pages/signup");
                            }}
                        >
                            Register
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%', // Ensures the image covers the full width of the screen
        height: '100%', // Ensures the image covers the full height of the screen
    },
});

export default WelcomeScreen;
