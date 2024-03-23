import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import Colors from "../assets/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import emailIcon from "../assets/email.png";
import passwordIcon from "../assets/password.png";
import { useNavigation } from '@react-navigation/native';

const Register = () => {
    const fontsLoaded = useCustomFonts(); // Use the custom hook
    const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login'); // Navigate to the login screen
  };
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                <Text style={styles.itimText}>Créer votre</Text>
                <Text style={styles.sedText}> espace personnel</Text>
            </Text>
      
            <View style={styles.inputContainer}>

                <TextInput
                    style={[styles.input, styles.firstInput]} 
                    placeholder="Prénom"
                    placeholderTextColor={Colors.Gray}
                />
                <TextInput
                    style={[styles.input, styles.secondInput]} 
                    placeholder="Nom"
                    placeholderTextColor={Colors.Gray}
                />
            </View>
          
        
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Date de naissance"
                    placeholderTextColor={Colors.Gray}
                />
            </View>
            <View style={styles.inputContainer}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={Colors.Gray}
                />
            </View>
            <View style={styles.inputContainer}>
           
                <TextInput
                    style={styles.input}
                    placeholder="Téléphone"
                    placeholderTextColor={Colors.Gray}
                />
            </View>
            <View style={styles.inputContainer}>
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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmer le mot de passe"
                    placeholderTextColor={Colors.Gray}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isPasswordVisible}
                />
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginPress}>
        <Text style={styles.linkText}>Vous avez déjà un compte? Connecter</Text>
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
    firstInput: {
        marginRight: 10,
    },
    secondInput: {
        marginRight: 0,
    },
    linkText: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: Colors.Yellow,
        marginTop: 20,
      },
    title: {
        fontSize: 36,
        fontFamily: "Sed",
        color: Colors.Blue,
        marginBottom: 20,
        bottom: 10,
        textAlign: 'center'
        },
        BigContainer: {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginBottom: 20,
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
        paddingLeft: 20, // Adjust padding to accommodate icon width
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
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }],
    },
    sedText: {
        fontFamily: "Sed",
        color: Colors.Yellow,
    },
});

export default Register;
