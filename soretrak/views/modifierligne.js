import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import Colors from "../assets/colors";
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation, useRoute } from "@react-navigation/native";
import LigneService from "../viewModels/generalfile.js";

const ModifierLigne = () => {
  const fontsLoaded = useCustomFonts(); // Use the custom hook
  const navigation = useNavigation();
  const route = useRoute();

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const [ligneNumero, setLigneNumero] = useState(""); // State for Ligne N°
  const [ligne, setLigne] = useState(""); // State for Ligne
  const [heureDepart, setHeureDepart] = useState(""); // State for Heure de départ
  const [heureRetour, setHeureRetour] = useState("");
  const [tarif, setTarif] = useState(""); // State for Heure de retour
  const { ligneData } = route.params;
  console.log(ligneData);
  useEffect(() => {
    if (ligneData) {
      setLigneNumero(ligneData.num.toString());
      setLigne(ligneData.ligne);
      setHeureDepart(ligneData.heure_départ);
      setHeureRetour(ligneData.heure_retour);
      setTarif(ligneData.tarif.toString());
    }
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const updateLigne = async () => {
    try {
        const updatedData = {
            num: parseInt(ligneNumero), // Convert num back to integer
            ligne,
            heure_départ: heureDepart,
            heure_retour: heureRetour,
            tarif: parseFloat(tarif), // Convert tarif back to float
        };
        const ligneService = new LigneService();
        const updatedLigne = await ligneService.updateLigne(ligneData._id, updatedData);
        // Handle successful update
        console.log("Ligne updated successfully:", updatedLigne);
        // Navigate back to previous screen
        navigation.replace('ManageTrajets');
        //navigation.replace('VotreTrajet');
    } catch (error) {
        // Handle error
        console.error("Error updating ligne:", error);
    }
};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.White }}
      behavior="padding"
    >
              <ScrollView>

    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        <Text style={styles.itimText}>Modifier </Text>
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
      <TouchableOpacity style={styles.button} onPress={updateLigne}>
        <Text style={styles.buttonText}>Modifier</Text>
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
  inputTitle: {
    fontSize: 16,
    fontFamily: "Inter",
    color: Colors.Black,
    marginBottom: 8, // Adjust spacing between title and input if needed
  },
  title: {
    fontSize: 36,
    fontFamily: "Sed",
    color: Colors.Blue,
    textAlign: "center",
    marginBottom: 50,
    marginTop: 80,
  },
  inputContainer: {
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 65,
    left: 30,
    zIndex: 1, // Ensure the button is above other elements
  },
  backArrow:{
    width: 40,
    height: 40,
  
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
