import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LigneService from "../viewModels/generalfile.js";
const ListTrajet = () => {
  const fontsLoaded = useCustomFonts(); // Load custom fonts
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const goBack = () => {
    navigation.goBack();
  };

  const parseTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const currentDate = new Date();
    currentDate.setHours(hours, minutes, 0, 0); // Set hours and minutes, and clear seconds and milliseconds
    return currentDate;
  };
  const handleTableRowPress = async (ligne) => {
    const currentDateTime = new Date();
    const selectedDate = new Date(date);
    console.log("Selected date:", selectedDate.toLocaleDateString("en-TN"));

    const isToday =
      selectedDate.getDate() === currentDateTime.getDate() &&
      selectedDate.getMonth() === currentDateTime.getMonth() &&
      selectedDate.getFullYear() === currentDateTime.getFullYear();

    console.log(
      "Current time:",
      currentDateTime.toLocaleString("en-TN", { timeZone: "Africa/Tunis" })
    );

    const ligneTime =
      stationFrom === "Kairouan"
        ? parseTime(ligne.heure_départ)
        : parseTime(ligne.heure_retour);
    console.log(
      "Time selected:",
      ligneTime.toLocaleString("en-TN", { timeZone: "Africa/Tunis" })
    );

    // Convert both times to milliseconds since the Unix epoch for accurate comparison
    const currentDateTimeMillis = currentDateTime.getTime();
    console.log("Current time in milliseconds:", currentDateTimeMillis);

    const ligneTimeMillis = ligneTime.getTime();
    console.log("Time selected in milliseconds:", ligneTimeMillis);

    // Calculate the difference in minutes between current time and ligne time
    const timeDifference =
      Math.abs(currentDateTimeMillis - ligneTimeMillis) / (1000 * 60);
    console.log("Time difference:", timeDifference);

    // If current time is greater than ligne time or time difference is less than 30 minutes
    if (
      isToday &&
      (currentDateTimeMillis > ligneTimeMillis || timeDifference < 30)
    ) {
      // Show error message to the user
      Alert.alert(
        "Désolé !",
        "Vous ne pouvez pas sélectionner cette ligne de voyage parce qu'elle est déjà partie ou qu'elle partira dans moins de 30 minutes.",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      try {
        const viewModel = new LigneService();
        const formattedDate = formatDate(date);
        console.log("Formatted Date:", formattedDate);
        console.log("Ligne ID:", ligne._id);
        const bus = await viewModel.findBusByLigneIdAndDate(
          ligne._id,
          formattedDate
        );
        await AsyncStorage.setItem("busData", JSON.stringify(bus));
        console.log("Bus:", bus);
        await AsyncStorage.setItem(
          "selectedLigne",
          JSON.stringify({ ligne, selectedDate: date })
        );

        navigation.navigate("Selectionne");
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    }
  };

  //function to convert string to time and then calculate the heure arrive using the duration
  function calculateArrivalTime(timeString, durationString) {
    // Parse time string into hours and minutes
    //16:30
    // Hours = 16, Minutes = 30
    const [hours, minutes] = timeString.split(":").map(Number);

    // Parse duration string into hours and minutes
    //2h35m
    // Hours = 2, Minutes = 35
    const [durationHours, durationMinutes] = durationString
      .match(/\d+/g)
      .map(Number);


    // Calculate total minutes for time and duration
    const totalMinutes =
      hours * 60 + minutes + durationHours * 60 + durationMinutes;

    // Calculate new hours and minutes
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    // Format hours and minutes
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(newMinutes).padStart(2, "0");

    // Return formatted arrival time
    // HD + D = HA
    return `${formattedHours}:${formattedMinutes}`;
  }

  //Getting the session variables and setting where they need to be
  const [stationFrom, setStationFrom] = useState(""); // State for station from
  const [stationTo, setStationTo] = useState("");
  const [ligneData, setLigneData] = useState([]);
  const [lignes, setLignes] = useState([]);
  const firstLigneNum = lignes.length > 0 ? lignes[0].num : null;

  useEffect(() => {
    // Fetch data from AsyncStorage
    const fetchData = async () => {
      try {
        const selectedData = await AsyncStorage.getItem("selectedData");
        if (selectedData !== null) {
          const { stationFromLigne, stationToLigne, selectedLigne } =
          JSON.parse(selectedData);
          setStationFrom(stationFromLigne);
          setStationTo(stationToLigne);
          console.log("Selected Route:", selectedLigne);
          const viewModel = new LigneService();
          const data = await viewModel.getLignesByLigneName(selectedLigne);
          console.log("Lignes fetched:", data);
          setLignes(data);
          setLigneData(data);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
        // Handle error
      }
    };
    fetchData();
  }, []);
  const formatDate = (date) => {
    if (!date) return ""; // Return empty string if date is not provided

    // Convert the date to a formatted string "DD-MM-YYYY"
    return date.toLocaleDateString("fr-FR");
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    //setLignes(data);
    const today = new Date();
    const currentTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ); // Set current time to today at midnight

    // Check if the selected date is before today
    if (currentDate < currentTime) {
      console.log("Selected date is before today");
      setLignes([]); // Clear the scrollview
    } else {
      // Calculate the difference in milliseconds between the selected date and today's date
      const timeDifference = currentDate.getTime() - currentTime.getTime();
    
      // Calculate the difference in days
      const differenceInDays = timeDifference / (1000 * 3600 * 24);
    
      // Check if the selected date is 3 days or more ahead of today's date
      if (differenceInDays >= 7) {
        console.log("Selected date is 3 days or more ahead of today");
        setLignes([]); // Clear the scrollview
      } else {
        console.log("Selected date is in the present or future");
        setLignes(ligneData);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.itimText}>Voyages </Text>
        <Text style={styles.sedText}>Suggérés</Text>
      </Text>
      <View style={styles.rectangle} />
      <View style={styles.rowContainer}>

  <Text style={styles.subtitle}>Ligne N°:   </Text>
  <Text style={styles.subtitle2}>{firstLigneNum}</Text>
  </View>

      <View style={styles.lineContainer}>
        <TextInput
          style={styles.disabledInput}
          editable={false}
          placeholder="From"
          placeholderTextColor={Colors.Gray}
          value={stationFrom}
        />
        <Text style={styles.toText}>Vers </Text>
        <TextInput
          style={styles.disabledInput}
          editable={false}
          placeholder="Destination"
          placeholderTextColor={Colors.Gray}
          value={stationTo}
        />
      </View>
      <SafeAreaView style={styles.datepicker}>
        <Image
          source={require("../assets/calendar.png")}
          style={styles.calendarIcon}
        />
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
          <ScrollView vertical>
            <View style={styles.tableView}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Heure de départ</Text>
                <Text style={styles.headerText}>Heure d'arrivée</Text>
                <Text style={styles.headerText}>Durée</Text>
              </View>
              {/* Render rows based on fetched data */}
              {lignes.map((ligne, index) => (
                <TouchableOpacity
                  onPress={() => handleTableRowPress(ligne)}
                  key={index}
                >
                  <View style={styles.tableRow}>
                    <Image
                      source={require("../assets/bus.png")}
                      style={styles.cellImage}
                    />
                    {stationFrom === "Kairouan" ? (
                      <>
                        <Text style={styles.cellText}>
                          {ligne.heure_départ}
                        </Text>
                        <Text style={styles.cellText}>
                          {calculateArrivalTime(
                            ligne.heure_départ,
                            ligne.durée
                          )}
                        </Text>
                        <Text style={styles.cellText}>{ligne.durée}</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.cellText}>
                          {ligne.heure_retour}
                        </Text>
                        <Text style={styles.cellText}>
                          {calculateArrivalTime(
                            ligne.heure_retour,
                            ligne.durée
                          )}
                        </Text>
                        <Text style={styles.cellText}>{ligne.durée}</Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Image
          source={require("../assets/backarrow.png")}
          style={styles.backArrow}
        />
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
    width: "100%",
    height: "23%", // Adjust thickness as needed
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

  },
  subtitle2: {
    fontSize: 24,
    fontFamily: "Inter",
    marginTop: 10,
    color: Colors.Blue
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: "center",// Align items vertically
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
    textAlign: "center",
    fontSize: 18,
  },
  toText: {
    fontSize: 20,
    fontFamily: "Ink",
    color: Colors.Black,
  },
  datepicker: {

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
    height: "80%",
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
  },
});

export default ListTrajet;
