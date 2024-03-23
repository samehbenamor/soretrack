import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory

const AdminChoice = () => {
    const fontsLoaded = useCustomFonts(); // Load custom fonts

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
      }
  return (
    <View style={styles.container}>
      {/* First Button */}
      <TouchableOpacity style={[styles.button, styles.firstButton]}>
        <Text style={[styles.buttonText, styles.firstButtonText]}>Gérer ligne</Text>
      </TouchableOpacity>
      {/* Second Button */}
      <TouchableOpacity style={[styles.button, styles.secondButton]}>
        <Text style={[styles.buttonText, styles.secondButtonText]}>Gérer données des clients</Text>
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
  button: {
    width: "80%",
    aspectRatio: 2, // Adjust aspect ratio as needed
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  firstButton: {
    backgroundColor: Colors.Blue,
  },
  secondButton: {
    backgroundColor: Colors.Yellow,
  },
  buttonText: {
    fontFamily: "Inter", // Change font family as needed
    fontSize: 20, // Adjust font size as needed
    textAlign: "center",
  },
  firstButtonText: {
    color: Colors.Yellow,
    fontFamily: "Sed", // Assuming "Sed" is your custom font
  },
  secondButtonText: {
    color: Colors.Blue,
    fontFamily: "Sed", // Assuming "Sed" is your custom font
  },
});

export default AdminChoice;
