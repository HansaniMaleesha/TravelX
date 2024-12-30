import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

interface InputProps {
  control: any;
  name: string;
  rules?: object;
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function Input({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
}: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              value={value as string} // Add type assertion
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              style={[styles.input, error && styles.errorInput]}
              placeholderTextColor={error ? "red" : "#A9A9A9"}
            />
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00072D",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 8, // Adjusted for a smoother border
    marginVertical: 10,
    paddingHorizontal: 15,
    width: "90%", // Increased width
    alignSelf: "center", // Centers the input field
  },
  input: {
    fontSize: 18, // Increased font size
    fontWeight: "bold", // Bold font
    color: "#4052D6",
    padding: 12,
    height: 50, // Increased height for better touch targets
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14, // Slightly larger for readability
    marginTop: 5,
    marginLeft: 25,
  },
  errorInput: {
    borderColor: "red",
  },
});
