import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  Image,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from "react-native";

// Define button types for better type safety and scalability
type ButtonType = "PRIMARY" | "SECONDARY" | "TERTIARY";

interface ButtonProps {
  text: string;
  onPress: () => void;
  type?: ButtonType; // Defines the type of button
  bgcolor?: string; // Custom background color
  fgcolor?: string; // Custom foreground (text) color
  icon?: React.ReactNode; // React component as a custom icon
  source?: any; // External image source for icons
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  type = "PRIMARY",
  bgcolor,
  fgcolor,
  icon,
  source,
}) => {
  return (
    <Pressable
      style={[
        styles.baseContainer,
        styles[type], // Dynamically apply styles based on type
        bgcolor && { backgroundColor: bgcolor }, // Apply custom background color
      ]}
      onPress={onPress}
      android_ripple={{ color: "#ddd" }} // Add ripple effect for Android
    >
      {/* Left-aligned Icon or Image */}
      {source && <Image source={source} style={styles.imageIcon} />}
      {icon && <View style={styles.reactIcon}>{icon}</View>}

      {/* Centered Button Text */}
      <Text
        style={[
          styles.baseText,
          styles[`${type}_TEXT`], // Dynamically apply text styles based on type
          fgcolor && { color: fgcolor }, // Apply custom foreground color
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

// Define styles for the button
const styles = StyleSheet.create<{
  baseContainer: ViewStyle;
  PRIMARY: ViewStyle;
  SECONDARY: ViewStyle;
  TERTIARY: ViewStyle;
  baseText: TextStyle;
  PRIMARY_TEXT: TextStyle;
  SECONDARY_TEXT: TextStyle;
  TERTIARY_TEXT: TextStyle;
  imageIcon: ImageStyle;
  reactIcon: ViewStyle;
}>({
  // Base styles for all buttons
  baseContainer: {
    width: "90%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  // Styles for PRIMARY button
  PRIMARY: {
    backgroundColor: "#00A3E0",
  },

  // Styles for SECONDARY button
  SECONDARY: {
    borderWidth: 2,
    borderColor: "#00A3E0",
    backgroundColor: "transparent",
  },

  // Styles for TERTIARY button
  TERTIARY: {
    backgroundColor: "transparent",
  },

  // Base text style
  baseText: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    flex: 1, // Center text properly between icons
  },

  // Text styles for PRIMARY button
  PRIMARY_TEXT: {
    color: "white",
  },

  // Text styles for SECONDARY button
  SECONDARY_TEXT: {
    color: "#00A3E0",
  },

  // Text styles for TERTIARY button
  TERTIARY_TEXT: {
    color: "#00A3E0",
  },

  // Styles for external image icon
  imageIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight: 10,
  },

  // Styles for React component icon
  reactIcon: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
