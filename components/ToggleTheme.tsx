import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const ToggleTheme = () => {
  const { theme, toggleTheme, colours } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colours.background }]}>
      <TouchableOpacity onPress={toggleTheme}>
        {theme === "light" ? (
          <Ionicons
            name={"sunny-outline"}
            color={colours.text.primary}
            size={40}
          />
        ) : (
          <Ionicons
            name={"moon-outline"}
            color={colours.text.primary}
            size={40}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToggleTheme;
