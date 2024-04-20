import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";


import Colors from "../assets/colors";
import useCustomFonts from "../assets/fonts"; 

import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native';
// Assuming useCustomFonts.js is in the same directory
import loginViewModel from "../viewModels/loginViewModel";

import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = () => {
  const fontsLoaded = useCustomFonts();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var [errorText, setErrorText] = useState("");
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    //true = false
    //false = true
  };
  const navigation = useNavigation();
  const NavigateAfterSuccess = () => {
    if (reservationSession) {
    navigation.navigate('Ticket');
    } else {
    navigation.replace('VotreTrajet');
    } // Navigate to the login screen
  };

  const [reservationSession, setReservation] = useState(null);
  useEffect(() => {
    const checkReservationSession = async () => {
      try {
        const sessionData = await AsyncStorage.getItem("reservationData");
        if (sessionData !== null) {
          // User session found, set it in state
          setReservation(JSON.parse(sessionData));
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      }
    };
    checkReservationSession();
  }, []);
  const login = async () => {
    try {
      setErrorText("");
      if (email === "" || password === "") {
        setErrorText("*Remplir tous les champs avant de s'inscrire");
        return;
      }

      const newUser = await loginViewModel.Loginn(email, password);
      console.log("User logged in successfully:", newUser);

      if (newUser && newUser.token) {
        console.log("Token saved successfully:", newUser.token);
        // Check if newUser and token exist
        await AsyncStorage.setItem("userToken", newUser.token);
        //console.log("Token saved successfully:", newUser);
        // Save user data after successful login
        const user = await loginViewModel.saveUser(newUser.token);
        console.log("Test");
        console.log("si khouna:", user);
        //navigateToProfile();
        NavigateAfterSuccess();
      } else {
        // Handle failed login (e.g., invalid credentials)
        setErrorText("Courriel ou mot de passe invalide.");
      }
    } catch (error) {
      // console.error('Error logging in user:', error);
      // Handle other errors, e.g., network issues
      if (error.message === "Invalid email or password.") {
        setErrorText("*Courriel ou mot de passe invalide.");
      } else {
        setErrorText("*Un problème s'est produit. Veuillez réessayer plus tard.");
      }
    }
  };


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
          onChangeText={setEmail}
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
      <View style={styles.errorContrainer}>
        <Text style={styles.error}>{errorText}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonTextCrate}>Créer nouveau compte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordButton}>
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
  error: {
    //fontFamily: 'Bold',
    fontSize: 12,
    textAlign: "center",
    color: "#FF5C5C",
  },
  errorContrainer: {
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
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
    color: Colors.White,
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
