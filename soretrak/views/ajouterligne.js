import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
    ScrollView,
  Image,
} from "react-native";
import Colors from "../assets/colors";
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from "@react-navigation/native";
import LigneService from "../viewModels/generalfile.js";

const AjouterLigne = () => {
  const fontsLoaded = useCustomFonts(); // Use the custom hook
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const [ligneNumero, setLigneNumero] = useState(""); // State for Ligne N°
  const [ligne, setLigne] = useState(""); // State for Ligne
  const [heureDepart, setHeureDepart] = useState(""); // State for Heure de départ
  const [heureRetour, setHeureRetour] = useState("");
  const [tarif, setTarif] = useState("");
  const [duree, setDuree] = useState(""); // State for Heure de retour
  // State for Heure de retour

  const goBack = () => {
    navigation.goBack();
  };
  const handleAjouterLigne = async () => {
    try {
      // Create a new ligne object with the form data
      const ligneData = {
        num: parseInt(ligneNumero), // Convert to number
        ligne: ligne,
        heure_départ: heureDepart,
        heure_retour: heureRetour,
        durée: duree,
        tarif: parseFloat(tarif), // Convert to float
      };
      const ligneService = new LigneService();
      // Call the createLigne method of LigneService to add the new ligne
      await ligneService.createLigne(ligneData);
      console.log("Ligne created successfully:", ligneData);

      // Navigate back after adding the ligne
      navigation.replace('ManageTrajets');

    } catch (error) {
      console.error("Error creating ligne:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1, backgroundColor: Colors.White }}
    behavior="padding"
  >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        <Text style={styles.itimText}>Ajouter </Text>
        <Text style={styles.sedText}>ligne</Text>
      </Text>

      {/* Inputs */}
      <View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>Ligne N°</Text>
    <TextInput
        style={styles.input}
        placeholder="Ligne N°"
        placeholderTextColor={Colors.Gray}
        value={ligneNumero}
        onChangeText={setLigneNumero}
    />
</View>
<View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>Ligne</Text>
    <TextInput
        style={styles.input}
        placeholder="Ligne"
        placeholderTextColor={Colors.Gray}
        value={ligne}
        onChangeText={setLigne}
    />
</View>
<View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>Heure de départ</Text>
    <TextInput
        style={styles.input}
        placeholder="Heure de départ"
        placeholderTextColor={Colors.Gray}
        value={heureDepart}
        onChangeText={setHeureDepart}
    />
</View>
<View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>Heure de retour</Text>
    <TextInput
        style={styles.input}
        placeholder="Heure de retour"
        placeholderTextColor={Colors.Gray}
        value={heureRetour}
        onChangeText={setHeureRetour}
    />
</View>
<View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>Durée</Text>
    <TextInput
        style={styles.input}
        placeholder="Durée"
        placeholderTextColor={Colors.Gray}
        value={duree}
        onChangeText={setDuree}
    />
</View>
<View style={styles.inputContainer}>
    <Text style={styles.inputTitle}>Tarif</Text>
    <TextInput
        style={styles.input}
        placeholder="Tarif"
        placeholderTextColor={Colors.Gray}
        value={tarif}
        onChangeText={setTarif}
    />
</View>



      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleAjouterLigne}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Image
          source={require("../assets/backarrow.png")}
          style={styles.backArrow}
        />
      </TouchableOpacity>
    </View>
    </ScrollView>
    </KeyboardAvoidingView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: 20,
  },
  
  title: {
    fontSize: 36,
    fontFamily: "Sed",
    color: Colors.Blue,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 60,
  },
  inputContainer: {
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 1, // Ensure the button is above other elements
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
  inputTitle: {
    fontSize: 16,
    fontFamily: "Inter",
    color: Colors.Black,
    marginBottom: 8, // Adjust spacing between title and input if needed
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

export default AjouterLigne;
