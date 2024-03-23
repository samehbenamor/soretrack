import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import Colors from "../assets/colors";
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native';
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory

const Login = () => {
    const fontsLoaded = useCustomFonts(); // Use the custom hook

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.itimText}>Déjà </Text>
        <Text style={styles.sedText}>enregistré</Text>
      </Text>
      <View style={styles.inputContainer}>
        <Image source={emailIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.Gray}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={passwordIcon} style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor={Colors.Gray}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIconContainer}
          >
            <MaterialCommunityIcons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color={Colors.Gray}
            />
          </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonTextCrate}>Créer nouveau compte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontFamily: "Sed",
    color: Colors.Blue,
    marginBottom: 20,
    bottom: 69,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  inputIcon: {
    width: 24,
    height: 24,
    position: "absolute",
    left: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.Gray,
    borderRadius: 12,
    paddingLeft: 50, // Adjust padding to accommodate icon width
    fontSize: 16,
    fontFamily: "Inter",
    color: Colors.Black,
    backgroundColor: Colors.PastelBlue,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.Blue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Itim",
    color: Colors.White,
  },
  itimText: {
    fontFamily: "Itim",
    color: Colors.Blue,
  },
  eyeIconContainer: {
    position: "absolute", // Position absolute to position it inside the passField
    right: 10, // Adjust as needed
    top: "50%", // Adjust as needed
    transform: [{ translateY: -12 }], // Center vertically
  },
  sedText: {
    fontFamily: "Sed",
    color: Colors.Yellow,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
    width: "100%",
    marginBottom: 20,
    marginVertical: 20,
  },
  createAccountButton: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.Yellow,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonTextCrate: {
    fontSize: 18,
    fontFamily: "Itim",
    color: Colors.Black,
  },
  forgotPasswordButton: {
    marginVertical: 20,
    marginTop: 30,
  },
  forgotPasswordText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default Login;
