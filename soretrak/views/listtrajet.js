import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory

const ListTrajet = () => {
  const fontsLoaded = useCustomFonts(); // Load custom fonts

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.itimText}>Voyages </Text>
        <Text style={styles.sedText}>séléctionné</Text>
      </Text>
      <Text style={styles.subtitle}>Ligne Numero:</Text>
      <View style={styles.lineContainer}>
        <TextInput
          style={styles.disabledInput}
          editable={false}
          placeholder="From"
          placeholderTextColor={Colors.Gray}
        />
        <Text style={styles.toText}>To</Text>
        <TextInput
          style={styles.disabledInput}
          editable={false}
          placeholder="Destination"
          placeholderTextColor={Colors.Gray}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: 30,
  },
  title: {
    fontSize: 36,
    marginTop: 30,
    justifyContent: "center",
    marginBottom: 20,
    fontFamily: "Sed",
  },
  itimText: {
    fontFamily: "Itim",
    color: Colors.Blue,
  },
  sedText: {
    fontFamily: "Sed",
    color: Colors.Yellow,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Ink",
    textAlign: "center",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  disabledInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Gray,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  toText: {
    fontSize: 20,
    fontFamily: "Ink",
    color: Colors.Black,
  },
  datePickerContainer: {
    paddingHorizontal: 20,
  },
  datePicker: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
});

export default ListTrajet;
