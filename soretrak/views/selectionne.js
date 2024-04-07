import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LigneService from "../viewModels/generalfile.js";

const Selectionne = () => {
  const fontsLoaded = useCustomFonts(); // Load custom fonts
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const ligneService = new LigneService();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);
  const [disabledCount, setDisabledCount] = useState(0);
  const decrementCount = (type) => {
    switch (type) {
      case "adult":
        setAdultCount((prevCount) => Math.max(0, prevCount - 1));
        break;
      case "child":
        setChildCount((prevCount) => Math.max(0, prevCount - 1));
        break;
      case "baby":
        setBabyCount((prevCount) => Math.max(0, prevCount - 1));
        break;
      case "disabled":
        setDisabledCount((prevCount) => Math.max(0, prevCount - 1));
        break;
      default:
        break;
    }
  };
  const incrementCount = (type) => {
    switch (type) {
      case "adult":
        setAdultCount((prevCount) => prevCount + 1);
        break;
      case "child":
        setChildCount((prevCount) => prevCount + 1);
        break;
      case "baby":
        setBabyCount((prevCount) => prevCount + 1);
        break;
      case "disabled":
        setDisabledCount((prevCount) => prevCount + 1);
        break;
      default:
        break;
    }
  };

  const [price, setPrice] = useState(0);
  const calculatePrice = () => {
    const tarif = selectedLigne?.ligne?.tarif || 0; // Get the tarif from selected ligne
    const adultPrice = adultCount * tarif; // Calculate adult price
    const childPrice = (childCount * tarif) / 2; // Calculate child price
    const babyPrice = 0; // Babies are free
    const disabledPrice = (disabledCount * tarif) / 4; // Calculate disabled price
    const totalPrice = adultPrice + childPrice + babyPrice + disabledPrice; // Calculate total price
    const roundedPrice = totalPrice.toFixed(2); // Round the total price to two decimal places
    setPrice(roundedPrice); // Update the price state
  };
  useEffect(() => {
    calculatePrice();
  }, [adultCount, childCount, disabledCount]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

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

  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateToLogin = () => {
    setModalVisible(false);
    navigation.replace("Login");
  };
  const [stationFrom, setStationFrom] = useState(""); // State for station from
  const [stationTo, setStationTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedLigne, setSelectedLigne] = useState({});
  const [bus, setBus] = useState({});
  const [nbrplaces, setNbrPlaces] = useState(0);
  useEffect(() => {
    // Fetch data from AsyncStorage
    const fetchData = async () => {
      try {
        const busData = await AsyncStorage.getItem("busData");
        const parsedBusData = JSON.parse(busData);
        console.log(
          "Bus Data from the session through selectionne.js:",
          parsedBusData
        );
        setBus(parsedBusData);
        const selectedData = await AsyncStorage.getItem("selectedData");
        if (selectedData !== null) {
          const { stationFromLigne, stationToLigne } = JSON.parse(selectedData);
          setStationFrom(stationFromLigne);
          setStationTo(stationToLigne);
        }
        const SelectedLigne = await AsyncStorage.getItem("selectedLigne");
        console.log("Selected Route:", SelectedLigne);
        if (SelectedLigne !== null) {
          const { ligne, selectedDate } = JSON.parse(SelectedLigne);
          setSelectedLigne({ ligne, selectedDate });
          console.log("Selected Ligne:", ligne);
          setDate(new Date(selectedDate));
          console.log("Date:", date); // Set date from AsyncStorage
          /////
          /*const formattedDate = formatDate(date);
          console.log("Formatted Date:", formattedDate);
          console.log("Ligne ID:", ligne._id);
          const bus = await ligneService.findBusByLigneIdAndDate(
            ligne._id,
            formattedDate
          );
          await AsyncStorage.setItem("busData", JSON.stringify(bus));
          console.log("Bus:", bus);*/
         
          //console.log("Our bus has: ", bus);
          //setNbrPlaces(parsedBusData?.nombrePlaces);
          //console.log("Current number of places from variable:", nbrplaces);

          /////
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
        // Handle error
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("Our bus has: ", bus);
    console.log("Current number of places from variable:", bus.nombrePlaces);
    setNbrPlaces(bus.nombrePlace);
    console.log("Current number of places saved in in nbrplaces:", nbrplaces);
  }, [bus]);
  function calculateArrivalTime(timeString, durationString) {
    if (!timeString || !durationString) {
      return ""; // Return empty string if timeString is undefined
    }

    // Parse time string into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);

    // Parse duration string into hours and minutes
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
    return `${formattedHours}:${formattedMinutes}`;
  }
  const formatDuration = (duration) => {
    if (!duration) return ""; // Return empty string if duration is not provided

    // Parse the duration string to extract hours and minutes
    const [hours, minutes] = duration.split("h");

    // Convert hours and minutes to integers
    const hoursInt = parseInt(hours, 10);
    const minutesInt = parseInt(minutes, 10);

    // Format the duration string
    if (hoursInt === 0 && minutesInt === 0) {
      return ""; // Return empty string if duration is 0 hours and 0 minutes
    } else if (hoursInt === 0) {
      return `${minutesInt} minute${minutesInt === 1 ? "" : "s"}`; // Return only minutes if hours is 0
    } else if (minutesInt === 0) {
      return `${hoursInt} heure${hoursInt === 1 ? "" : "s"}`; // Return only hours if minutes is 0
    } else {
      return `${hoursInt} heure${
        hoursInt === 1 ? "" : "s"
      } et ${minutesInt} minute${minutesInt === 1 ? "" : "s"}`; // Return hours and minutes
    }
  };
  const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const sessionData = await AsyncStorage.getItem("user");
        if (sessionData !== null) {
          // User session found, set it in state
          setUserSession(JSON.parse(sessionData));
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      }
    };
    checkUserSession();
  }, []);
  const handleReservation = async () => {
    const totalPassengers = adultCount + childCount + babyCount + disabledCount;
    console.log("Total Passengers from the selectionne page:", totalPassengers);
    if (totalPassengers > bus.nombrePlaces) {
      // Show alert informing user that there are not enough available seats
      alert("Il n'y a pas assez de places disponibles dans le bus.");
      return; // Exit function early
    }
    try {
      const reservationData = {
        price,
        adultCount,
        childCount,
        babyCount,
        disabledCount,
        stationFrom,
        stationTo,
        date,
      };
      console.log(reservationData);
      await AsyncStorage.setItem(
        "reservationData",
        JSON.stringify(reservationData)
      );
      // Navigate to ticket reservation page
      if (userSession) {
        navigation.replace("Ticket");
      } else {
        // User is not logged in, show login modal
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error saving reservation data to AsyncStorage:", error);
    }
  };
  const formatDate = (date) => {
    if (!date) return ""; // Return empty string if date is not provided

    // Convert the date to a formatted string "DD-MM-YYYY"
    return date.toLocaleDateString("fr-FR");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.itimText}>Voyage </Text>
        <Text style={styles.sedText}>sélectionné</Text>
      </Text>
      <View style={styles.rectangle} />
      <View style={styles.rowContainer}>
        <Text style={styles.subtitle}>Ligne N°: </Text>
        <Text style={styles.subtitle2}>{selectedLigne?.ligne?.num}</Text>
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
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <View style={styles.labelInputRow}>
          <Text style={styles.labelText}>Heure de Débart:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Heure de Débart"
            placeholderTextColor={Colors.Gray}
            value={
              stationFrom === "Kairouan"
                ? selectedLigne?.ligne?.heure_départ || ""
                : selectedLigne?.ligne?.heure_retour || ""
            }
          />
        </View>
        <View style={styles.labelInputRow}>
          <Text style={styles.labelText}>Heure d'arrivé:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Heure d'arrivé"
            placeholderTextColor={Colors.Gray}
            value={
              stationFrom === "Kairouan"
                ? calculateArrivalTime(
                    selectedLigne?.ligne?.heure_départ,
                    selectedLigne?.ligne?.durée
                  ) || ""
                : calculateArrivalTime(
                    selectedLigne?.ligne?.heure_retour,
                    selectedLigne?.ligne?.durée
                  ) || ""
            }
          />
        </View>
        <View style={styles.labelInputRow}>
          <Text style={styles.labelText}>Durée:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Durée"
            placeholderTextColor={Colors.Gray}
            value={formatDuration(selectedLigne?.ligne?.durée) || ""}
          />
        </View>
        <View style={styles.labelInputRow}>
          <Text style={styles.labelText}>Nombre de places:</Text>
          <TextInput
            style={[
              styles.input,
              {
                color:
                  bus?.nombrePlaces >= 27 && bus?.nombrePlaces <= 55
                    ? "green"
                    : bus?.nombrePlaces >= 10 && bus?.nombrePlaces < 27
                    ? "yellow"
                    : "red",
              },
            ]}
            editable={false}
            placeholder="Nombre de places."
            placeholderTextColor={Colors.Gray}
            value={bus?.nombrePlaces?.toString() || ""}
          />
        </View>

        <View style={styles.separator}></View>
        {/* Subtitle */}
        <Text style={styles.subTitle}>Nature Billet</Text>
        {/* Separate lines */}
        <View style={styles.line}>
          <Text style={styles.lineLabel}>Adulte</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => decrementCount("adult")}
          >
            <View style={[styles.circle, styles.grayButton]} />
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counter}>{adultCount}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => incrementCount("adult")}
          >
            <View style={[styles.circle, styles.yellowButton]} />
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <Text style={styles.lineLabel}>
            Enfant<Text style={styles.red}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => decrementCount("child")}
          >
            <View style={[styles.circle, styles.grayButton]} />
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counter}>{childCount}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => incrementCount("child")}
          >
            <View style={[styles.circle, styles.yellowButton]} />
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <Text style={styles.lineLabel}>
            Bébé<Text style={styles.red}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => decrementCount("baby")}
          >
            <View style={[styles.circle, styles.grayButton]} />
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counter}>{babyCount}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => incrementCount("baby")}
          >
            <View style={[styles.circle, styles.yellowButton]} />
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <Text style={styles.lineLabel}>
            Handicapé<Text style={styles.red}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => decrementCount("disabled")}
          >
            <View style={[styles.circle, styles.grayButton]} />
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counter}>{disabledCount}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => incrementCount("disabled")}
          >
            <View style={[styles.circle, styles.yellowButton]} />
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator}></View>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Montant à payer (TND): </Text>
          <Text style={styles.price}>{price} TND</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          <Text style={styles.red2}>*</Text>Enfant (entre 3 et 7 ans): Demi
          tarif,
          <Text style={styles.red2}>*</Text>Bébé (inférieur à 3 ans): Gratuit,
          <Text style={styles.red2}>*</Text>Handicapé: 1/4 tarif
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Image
            source={require("../assets/backarrow.png")}
            style={styles.backArrow}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reserveButton}
          onPress={handleReservation}
        >
          <Text style={styles.reserveButtonText}>Réserver</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Se connecter</Text>
            <Text style={styles.modalDescription}>
              Vous devez vous connecter avant de procéder au paiement
            </Text>
            <View style={styles.buttonContainerModal}>
              <TouchableOpacity
                style={[styles.buttonModal, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.buttonTextModal}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonModal, styles.connectButton]}
                onPress={navigateToLogin}
              >
                <Text style={styles.buttonTextModal}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: 30,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Adjust as needed
    marginHorizontal: 30, // Adjust as needed
    marginBottom: 30,
    marginTop: 10, // Adjust as needed
  },
  backButton: {
    alignSelf: "center",
    marginRight: 50,
  },
  backArrow: {
    width: 60,
    height: 60,
  },
  reserveButton: {
    // Adjust as needed

    width: 150,
    backgroundColor: Colors.Blue,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  reserveButtonText: {
    fontFamily: "Itim",
    fontSize: 24,
    color: Colors.White,
  },
  infoContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  infoText: {
    zIndex: -1,
    fontSize: 8,
    fontFamily: "Inter",
    color: Colors.Black,
  },
  subTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: -1,
    justifyContent: "space-between",
  },
  subTitle: {
    fontSize: 16,
    fontFamily: "Inter",
    color: Colors.Black,
    marginRight: 10,
  },
  price: {
    zIndex: -1,
    fontSize: 20,
    fontFamily: "Inter",
    color: Colors.Green,
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
  inputContainer: {
    marginTop: 30,
  },
  labelInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  labelText: {
    width: 120, // Width of the label
    marginRight: 10,
    fontFamily: "Inter", // Assuming you have a font named "Inter"
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.Gray,
    paddingHorizontal: 10,
    fontSize: 18,
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
  subtitle2: {
    fontSize: 24,
    fontFamily: "Inter",
    marginTop: 10,
    color: Colors.Blue,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center", // Align items vertically
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
    marginTop: 10,
    marginLeft: 90,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    marginLeft: 10,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
    marginVertical: 5,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: "Inter",
    color: Colors.Yellow,
    marginBottom: 8,
    marginTop: 10,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  lineLabel: {
    width: "70%",
    fontFamily: "Inter",
    fontSize: 14,
    color: Colors.Black,
  },
  red: {
    fontSize: 18,
    color: Colors.Red,
  },
  red2: {
    fontSize: 12,
    color: Colors.Red,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.Gray,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.Black,
  },
  counter: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "Inter",
    color: Colors.Black,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: "absolute",
  },
  grayButton: {
    backgroundColor: Colors.Grey,
  },
  yellowButton: {
    backgroundColor: Colors.Yellow,
  },

  //Modal stuff
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  modalView: {
    backgroundColor: Colors.PastelBlue,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainerModal: {
    flexDirection: "row",
  },
  buttonModal: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: Colors.Gray,
  },
  connectButton: {
    backgroundColor: Colors.Yellow,
  },
  buttonTextModal: {
    fontSize: 16,
    color: Colors.Black,
  },
  //
});

export default Selectionne;
