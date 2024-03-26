import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Image } from "react-native";
import Colors from "../assets/colors";
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from '@react-navigation/native';

const ModifierLigne = () => {
    const fontsLoaded = useCustomFonts(); // Use the custom hook
    const navigation = useNavigation();

    if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
    }

    const [ligneNumero, setLigneNumero] = useState(""); // State for Ligne N°
    const [ligne, setLigne] = useState(""); // State for Ligne
    const [heureDepart, setHeureDepart] = useState(""); // State for Heure de départ
    const [heureRetour, setHeureRetour] = useState(""); // State for Heure de retour
    
  const goBack = () => {
    navigation.goBack();
  };
    return (
        <View style={styles.container}>
            {/* Title */}
            <Text style={styles.title}>
                <Text style={styles.itimText}>Modifier </Text>
                <Text style={styles.sedText}>ligne</Text>
            </Text>

            {/* Inputs */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ligne N°"
                    placeholderTextColor={Colors.Gray}
                    value={ligneNumero}
                    onChangeText={setLigneNumero}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ligne"
                    placeholderTextColor={Colors.Gray}
                    value={ligne}
                    onChangeText={setLigne}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Heure de départ"
                    placeholderTextColor={Colors.Gray}
                    value={heureDepart}
                    onChangeText={setHeureDepart}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Heure de retour"
                    placeholderTextColor={Colors.Gray}
                    value={heureRetour}
                    onChangeText={setHeureRetour}
                />
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Modifier</Text>
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
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 48,
        fontFamily: "Sed",
        color: Colors.Blue,
        textAlign: "center",
        marginBottom: 120,
        marginTop: 80,
    },
    inputContainer: {
        marginBottom: 20,
    },
    backButton: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
      },
    input: {
        height: 60,
        borderWidth: 1,
        borderColor: Colors.Gray,
        borderRadius: 12,
        paddingLeft: 20,
        fontSize: 16,
        fontFamily: "Inter",
        color: Colors.Black,
        backgroundColor: Colors.PastelBlue,
        width: "100%",
    },
    button: {
        height: 50,
        backgroundColor: Colors.Blue,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        width: "100%",
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
    sedText: {
        fontFamily: "Sed",
        color: Colors.Yellow,
    },
});

export default ModifierLigne;
