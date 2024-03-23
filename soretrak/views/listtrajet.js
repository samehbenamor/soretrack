import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const ListTrajet = () => {
  const fontsLoaded = useCustomFonts(); // Load custom fonts
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleTableRowPress = () => {
    navigation.navigate('Selectionne'); // Navigate to the Selectionne screen
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.itimText}>Voyages </Text>
        <Text style={styles.sedText}>Suggérés</Text>
      </Text>
      <View style={styles.rectangle} />
      <Text style={styles.subtitle}>Ligne N°:</Text>
      <View style={styles.lineContainer}>
        <TextInput
          style={styles.disabledInput}
          editable={false}
          placeholder="From"
          placeholderTextColor={Colors.Gray}
        />
        <Text style={styles.toText}>Vers </Text>
        <TextInput
          style={styles.disabledInput}
          editable={false}
          placeholder="Destination"
          placeholderTextColor={Colors.Gray}
        />
      </View>
      <SafeAreaView style={styles.datepicker}>
        <Image source={require("../assets/calendar.png")} style={styles.calendarIcon} />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      </SafeAreaView>
      <ScrollView style={styles.tablecont}>
      <View style={styles.tableContainer}>
        <ScrollView horizontal>
          <View style={styles.tableView}>
            <View style={styles.tableHeader}>
             
              <Text style={styles.headerText}>Heure de départ</Text>
              <Text style={styles.headerText}>Heure d'arrivée</Text>
              <Text style={styles.headerText}>Durée</Text>
            </View>
            <TouchableOpacity onPress={handleTableRowPress}>
            <View style={styles.tableRow}>
            <Image source={require("../assets/bus.png")} style={styles.cellImage} />

              <Text style={styles.cellText}>09:00</Text>
              <Text style={styles.cellText}>12:00</Text>
              <Text style={styles.cellText}>3 hours</Text>
            </View>
            </TouchableOpacity>
            {/* Add more rows as needed */}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
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
    padding: 30,
  },
  rectangle: {
    marginTop: 120,
    marginLeft: 30,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.Black,
    width: '100%',
    height: '23%', // Adjust thickness as needed
    marginVertical: 10,
    position: "absolute", // Adjust spacing as needed
  },
  tablecont: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    marginLeft: 35,
    marginTop: 30,
    justifyContent: "center",
    marginBottom: 10,
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
  datepicker: {
    marginTop: 10,
    marginLeft: 90,
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  backButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  backArrow: {
    width: 60,
    height: 60,
  },
  tableContainer: {
    flex: 1,
    maxHeight: 100,
  },
  tableView: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
  },
  headerText: {
    width: "35%", // Adjust the width as needed
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 16, // Adjusted font size
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
  },
  cellText: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Itim",
    fontSize: 16, // Adjusted font size
  },
  cellImage: {
    width: 24,
    height: 24,
    marginRight: 5, // Adjust spacing if needed
  }
});

export default ListTrajet;
