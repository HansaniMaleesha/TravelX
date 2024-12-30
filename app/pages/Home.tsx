import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { auth } from "../../firebase";

const Home = () => {
    const [flightsData, setFlightsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [tripCount, setTripCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [userEmail, setUserEmail] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [query, setQuery] = useState("airport");

    const API_KEY = "d2yJgkSMDJRICSiJYl8zXe5ClshNMft_d8oYKVjGzqc";
    const BASE_URL = "https://api.unsplash.com/search/photos";

    // Check for user authentication on component mount
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email);
        } else {
            setUserEmail("No user signed in");
        }

        const fetchFlights = async () => {
            try {
                const response = await axios.get(
                    "https://api.schiphol.nl/public-flights/flights?includedelays=false&page=0&sort=%2BscheduleTime",
                    {
                        headers: {
                            Accept: "application/json",
                            app_id: "c81d6da5", // Your app_id
                            app_key: "f723fe8ff441c11dc362bea418b72958", // Your app_key
                            ResourceVersion: "v4",
                        },
                    }
                );
                setFlightsData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching flight data:", err);
                setError("Failed to fetch data");
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    const fetchPhotos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(BASE_URL, {
                headers: {
                    Authorization: `Client-ID ${API_KEY}`,
                },
                params: {
                    query,
                    per_page: 10,
                },
            });
            setPhotos(response.data.results);
        } catch (err) {
            setError("Failed to fetch photos. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, [query]);

    const handleFlightSelect = (flightId) => {
        setSelectedFlights((prevFlights) => {
            const isSelected = prevFlights.includes(flightId);
            if (isSelected) {
                setTripCount((prevCount) => prevCount - 1);
                return prevFlights.filter((id) => id !== flightId);
            } else {
                setTripCount((prevCount) => prevCount + 1);
                return [...prevFlights, flightId];
            }
        });
    };

    const filteredFlights = flightsData
        ? flightsData.flights.filter((flight) =>
            flight.flightName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const renderSelectedFlights = () => {
        return selectedFlights.map((flightId) => {
            const flight = flightsData.flights.find((f) => f.id === flightId);
            return (
                <View key={flightId} style={styles.selectedFlightItem}>
                    <Text style={styles.selectedFlightText}>{flight.flightName}</Text>
                </View>
            );
        });
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading Flights...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Animated.View entering={FadeInDown.duration(200).springify()} style={styles.logoContainer}>
                    <MaterialCommunityIcons name="airplane" size={30} color="#00A3E0" />
                    <Text style={styles.logoText}>Travel</Text>
                    <Text style={styles.logoTextItalic}>X</Text>
                </Animated.View>
                <Animated.View entering={FadeInDown.duration(200).delay(200).springify()}>
                    <Text style={styles.emailText}>{userEmail}</Text>
                </Animated.View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/pages/login")}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Search Input */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search images..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={fetchPhotos}
            />

            {/* Flights List */}
            <ScrollView style={styles.flightListContainer}>
                {filteredFlights.length > 0 ? (
                    filteredFlights.map((flight, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, selectedFlights.includes(flight.id) && styles.cardSelected]}
                            onPress={() => handleFlightSelect(flight.id)}
                        >
                            {/* Left side: Random image */}
                            <View style={styles.imageContainer}>
                                {!loading && !error && photos.length > 0 && (
                                    <Image
                                        source={{ uri: photos[index % photos.length].urls.small }}
                                        style={styles.cardImage}
                                    />
                                )}
                            </View>

                            {/* Right side: Flight information */}
                            <View style={styles.cardContent}>
                                <Text style={styles.flightText}>
                                    <Text style={styles.label}>Aircraft Registration: </Text>
                                    {flight.aircraftRegistration || "N/A"}
                                </Text>
                                <Text style={styles.flightText}>
                                    <Text style={styles.label}>Flight Name: </Text>
                                    {flight.flightName || "N/A"}
                                </Text>
                                <Text style={styles.flightText}>
                                    <Text style={styles.label}>Estimated Landing Time: </Text>
                                    {flight.estimatedLandingTime || "N/A"}
                                </Text>
                                <Text style={styles.flightText}>
                                    <Text style={styles.label}>Expected Time on Belt: </Text>
                                    {flight.expectedTimeOnBelt || "N/A"}
                                </Text>
                                <Text style={styles.flightText}>
                                    <Text style={styles.label}>Flight Number: </Text>
                                    {flight.flightNumber || "N/A"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No flight data available.</Text>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.floatingButton} onPress={() => console.log("Selected Flights:", selectedFlights)}>
                <MaterialCommunityIcons name="airplane-takeoff" size={30} color="#fff" />
                {tripCount > 0 && <Text style={styles.floatingButtonText}>{tripCount}</Text>}
            </TouchableOpacity>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00072D",
        paddingTop: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logoText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#005C5C",
        marginLeft: 5,
    },
    emailText: {
        fontSize: 16,
        color: "#fff",
    },
    logoutButton: {
        marginTop: 10,
        backgroundColor: "#FF4500",
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    logoutText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
    searchInput: {
        height: 40,
        borderColor: "#444",
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        color: "#fff",
        backgroundColor: "#00072D",
    },
    flightListContainer: {
        marginTop: 20,
    },
    card: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#0F2573",
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 15,
    },
    cardImage: {
        width: 100,
        height: 120,
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
    },
    flightText: {
        fontSize: 14,
        color: "#fff",
    },
    label: {
        fontWeight: "bold",
        color: "#fff",
    },
    bookButton: {
        marginTop: 10,
        backgroundColor: "#00ADAD",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    bookButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    noDataText: {
        textAlign: "center",
        fontSize: 16,
        color: "#888",
        marginTop: 20,
    },
});

export default Home;
