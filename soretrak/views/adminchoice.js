import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from '@react-navigation/native';

const AdminChoice = () => {
    const fontsLoaded = useCustomFonts(); // Load custom fonts
    const navigation = useNavigation();
    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
      }

      const handleGestionLignePress = () => {
        navigation.navigate('ManageTrajets');
    };
    const handleGestionClientPress = () => {
      navigation.navigate('ManageClients');
  };

  const goBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      {/* First Button */}
      <TouchableOpacity style={[styles.button, styles.firstButton]} onPress={handleGestionLignePress}>
        <Text style={[styles.buttonText, styles.firstButtonText]}>Gérer ligne</Text>
      </TouchableOpacity>
      {/* Second Button */}
      <TouchableOpacity style={[styles.button, styles.secondButton]}  onPress={handleGestionClientPress}>
        <Text style={[styles.buttonText, styles.secondButtonText]}>Gérer données des clients</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Image source={require("../assets/backarrow.png")} style={styles.backArrow} />
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
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  firstButton: {
    backgroundColor: Colors.Blue,
  },
  secondButton: {
    backgroundColor: Colors.Yellow,
  },
  backButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "Inter", // Change font family as needed
    fontSize: 24, // Adjust font size as needed
    textAlign: "center",
  },
  firstButtonText: {
    color: Colors.Yellow,
    fontFamily: "Itim", // Assuming "Sed" is your custom font
    fontSize: 60, // Adjust font size as needed
  },
  secondButtonText: {
    color: Colors.Blue,
    fontFamily: "Itim", // Assuming "Sed" is your custom font
    fontSize: 60, // Adjust font size as needed
  },
});

export default AdminChoice;
