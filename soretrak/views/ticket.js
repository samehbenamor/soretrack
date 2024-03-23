import React, { useState }  from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons

const Ticket = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
    const handleConfirm = () => {
        // Add functionality to handle confirmation here
      };
  return (
    
    <KeyboardAvoidingView  style={{ flex: 1, backgroundColor: Colors.White }} behavior="padding">
          <ScrollView>

    <View style={styles.container}>
        
      <Text style={styles.title}>
        <Text style={styles.itimText}>Ticket d'Accès </Text>
        <Text style={styles.sedText}>à Bord</Text>
      </Text>
      <View style={styles.row}>
        {/* Left Column */}
        <View style={styles.column}>
          <Text style={styles.label}>De:</Text>
          <TextInput style={styles.input} placeholder="Input 1" />
        </View>
        {/* Right Column */}
        <View style={styles.column}>
          <Text style={styles.label}>A:</Text>
          <TextInput style={styles.input} placeholder="Input 2" />
        </View>
      </View>
      
      <View style={styles.row}>
        {/* Left Column */}
        <View style={styles.column}>
          <Text style={styles.label}>Date du voyage:</Text>
          <TextInput style={styles.input} placeholder="Input 1" />
        </View>
        {/* Right Column */}
        <View style={styles.column}>
          <Text style={styles.label}>Date de réservation:</Text>
          <TextInput style={styles.input} placeholder="Input 2" />
        </View>
      </View>

      <View style={styles.row}>
        {/* Left Column */}
        <View style={styles.column}>
          <Text style={styles.label}>Temps de départ:</Text>
          <TextInput style={styles.input} placeholder="Input 1" />
        </View>
        {/* Right Column */}
        <View style={styles.column}>
          <Text style={styles.label}>Nombre de voyageurs:</Text>
          <TextInput style={styles.input} placeholder="Input 2" />
        </View>
      </View>

      <View style={styles.row}>
        {/* Left Column */}
        <View style={styles.column}>
          <Text style={styles.label}>Nombre d'adultes:</Text>
          <TextInput style={styles.input} placeholder="Input 1" />
        </View>
        {/* Right Column */}
        <View style={styles.column}>
          <Text style={styles.label}>Nombre d'enfants:</Text>
          <TextInput style={styles.input} placeholder="Input 2" />
        </View>
      </View>

      <View style={styles.row}>
        {/* Left Column */}
        <View style={styles.column}>
          <Text style={styles.label}>Nombre de bébés:</Text>
          <TextInput style={styles.input} placeholder="Input 1" />
        </View>
        {/* Right Column */}
        <View style={styles.column}>
          <Text style={styles.label}>Nombre de handicapées:</Text>
          <TextInput style={styles.input} placeholder="Input 2" />
        </View>
      </View>
      <View style={styles.separator} />
      <Text style={styles.paymentLabel}>Entrer votre code pour effectuer le paiement</Text>
      <View style={styles.passwordContainer}>
      <TextInput
          style={styles.passwordinput}
          placeholder="Code"
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
      <Text style={styles.explainLabel}>
        Nous vous envoyons ce ticket par <Text style={{ color: "red" }}>e-mail</Text> une fois que le paiement aura été effectué. L'e-mail contient également
        un <Text style={styles.underline}>QR code</Text> que vous devez montrer au <Text style={styles.underline}>contrôleur</Text>.
      </Text>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirmer</Text>
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
    padding: 30,
  },
  underline: {
    textDecorationLine: "underline",
    color: Colors.Red,
  },
  title: {
    fontSize: 32,
    marginLeft: 35,
    marginTop: 30,
    justifyContent: "center",
    marginBottom: 10,
    fontFamily: "Sed",
  },
  confirmButton: {
    backgroundColor: Colors.Blue,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: Colors.White,
    fontSize: 16,
    fontFamily: "Inter",
  },
  itimText: {
    fontFamily: "Itim",
    color: Colors.Blue,
  },
  sedText: {
    fontFamily: "Sed",
    color: Colors.Yellow,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  column: {
    flex: 1,
    marginRight: 20,
  },
  label: {
    fontSize: 12,
    color: Colors.DarkGray,
    fontFamily: "Inter",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Yellow,
    height: 40,
    paddingHorizontal: 50,
    fontFamily: "Inter",
    fontSize: 16,
    textAlignVertical: "center",
    color: Colors.Blue,
    marginTop: 5,
  },
  eyeIconContainer: {
    position: "absolute", // Position absolute to position it inside the passField
    right: 10, // Adjust as needed
    top: "50%", // Adjust as needed
    transform: [{ translateY: -12 }], // Center vertically
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
    width: "100%",
    marginBottom: 20,
    marginVertical: 20,
  },
  paymentLabel: {
    fontSize: 16,
    color: Colors.DarkGray,
    fontFamily: "Inter",
    marginBottom: 10,
    textAlign: "justify",
  },
  explainLabel: {
    fontSize: 12,
    color: Colors.DarkGray,
    fontFamily: "Inter",
      marginTop: 10,
    textAlign: "justify",
  },
  passwordinput: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.Gray,
    borderRadius: 12,
    paddingLeft: 20, // Adjust padding to accommodate icon width
    fontSize: 16,
    fontFamily: "Inter",
    color: Colors.Black,
    backgroundColor: Colors.PastelBlue,
  },
});

export default Ticket;
