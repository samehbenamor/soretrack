import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
  Platform
} from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import LigneService from "../viewModels/generalfile.js";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
const Ticket = () => {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(new Date());
  const navigation = useNavigation();
  const [bus, setBus] = useState({});

  const [selectedLigne, setSelectedLigne] = useState({});
  const [SelectedReservation, setSelectedReservation] = useState({});
  const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const sessionData = await AsyncStorage.getItem("user");
        console.log(sessionData);
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

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      try {
        const storedReservationData = await AsyncStorage.getItem(
          "reservationData"
        );
        const storedSelectedLigne = await AsyncStorage.getItem("selectedLigne");
        const busData = await AsyncStorage.getItem("busData");
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log("/////////Ticket page///////////");
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log(
          "This is the stored reservation data:",
          storedReservationData
        );
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log(
          "This is the stored Selected Ligne data:",
          storedSelectedLigne
        );
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log(
          "This is the stored bus data:",
          busData
        );
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        console.log("///////////////////////////////");
        if (storedReservationData !== null) {
          setSelectedReservation(JSON.parse(storedReservationData));
        }

        if (storedSelectedLigne !== null) {
          setSelectedLigne(JSON.parse(storedSelectedLigne));
        }

        if (busData !== null) {
          setBus(JSON.parse(busData));
        }


        console.log("Data loaded from AsyncStorage successfully.");
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadFromAsyncStorage();
  }, []);
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const ligneService = new LigneService();
  const handleConfirm = async () => {
    if (password === userSession?.code_paiement.toString()) {
      try {
        const IdUser = userSession.id;
        const IdLigne = selectedLigne.ligne._id;
        console.log("The user id for the reservation:", IdUser);
        console.log("The ligne id for the reservation:", IdLigne);
        const totalpassengers = (SelectedReservation.adultCount || 0) +
        (SelectedReservation.childCount || 0) +
        (SelectedReservation.babyCount || 0) +
        (SelectedReservation.disabledCount || 0);
        console.log("Making sure the total is correct: ", totalpassengers);


        const reservationData = {
          userId: IdUser,
          ligneId: IdLigne,
          nombreDesAdultes: SelectedReservation.adultCount,
          nombreDesEnfants: SelectedReservation.childCount,
          nombreDeBebes: SelectedReservation.babyCount,
          nombreDesHandicaps: SelectedReservation.disabledCount,
          fraisTotal: SelectedReservation.price,
        };
        console.log("Reservation before saving:", reservationData);
        await ligneService.decrementUserCredit(userSession.id);
        await ligneService.createReservation(reservationData);
        await ligneService.subtractFromNombrePlaces(bus._id, totalpassengers);

        //Notifications part//
        if (Platform.OS === 'ios') {
          const { status } = await Notifications.requestPermissionsAsync();
          if (status !== 'granted') {
            alert("Désolé, nous avons besoin d'autorisations de notification pour vous envoyer des alertes de bus.");
            return;
          }
        }
        await Notifications.setNotificationChannelAsync('emails', {
          name: 'E-mail notifications',
          sound: 'honk.wav', // Provide ONLY the base filename
        });
        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Ne manquez pas votre bus.',
            body: `Votre bus 🚌 vers ${SelectedReservation.stationTo} arrive dans 10 minutes!`,
            sound: 'honk.wav'
          },
          trigger: { seconds: 5,
            channelId: 'emails' },
        })
        console.log('Notification scheduled:', notificationId);
        /////////////////////
        //'Ne manquez pas votre bus.'
        //Votre bus 🚌 vers ${SelectedReservation.stationTo} arrive dans 10 minutes!
        // Call the decrementUserCredit method with the user's ID
       
        navigation.replace("VotreTrajet");
      } catch (error) {
        console.error("Error decrementing user credit:", error);
        // Handle error
      }
    } else {
      // Passwords don't match, show modal
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const formatDate = (date) => {
    if (!date) return ""; // Return empty string if date is not provided or undefined

    // Check if date is a Date object before calling toLocaleDateString
    if (!(date instanceof Date)) {
      // If date is not a Date object, try parsing it as a Date
      date = new Date(date);
      if (isNaN(date.getTime())) {
        // If parsing fails, return an empty string
        return "";
      }
    }

    // Convert the date to a formatted string "DD-MM-YYYY"
    return date.toLocaleDateString("fr-FR");
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.White }}
      behavior="padding"
    >
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
              <TextInput
                style={styles.input}
                placeholder="Input 1"
                value={SelectedReservation.stationFrom}
                editable={false}
              />
            </View>
            {/* Right Column */}
            <View style={styles.column}>
              <Text style={styles.label}>A:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 2"
                value={SelectedReservation.stationTo}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.row}>
            {/* Left Column */}
            <View style={styles.column}>
              <Text style={styles.label}>Date du voyage:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 1"
                value={formatDate(SelectedReservation.date)}
                editable={false}
              />
            </View>
            {/* Right Column */}
            <View style={styles.column}>
              <Text style={styles.label}>Date de réservation:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 2"
                editable={false}
                value={formatDate(date)}
              />
            </View>
          </View>

          <View style={styles.row}>
            {/* Left Column */}
            <View style={styles.column}>
              <Text style={styles.label}>Temps de départ:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 1"
                editable={false}
                value={
                  SelectedReservation.stationFrom === "Kairouan"
                    ? selectedLigne?.ligne?.heure_départ || ""
                    : selectedLigne?.ligne?.heure_retour || ""
                }
              />
            </View>
            {/* Right Column */}
            <View style={styles.column}>
              <Text style={styles.label}>Nombre de voyageurs:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 2"
                editable={false}
                value={
                  (
                    (SelectedReservation.adultCount || 0) +
                    (SelectedReservation.childCount || 0) +
                    (SelectedReservation.babyCount || 0) +
                    (SelectedReservation.disabledCount || 0)
                  ).toString() || "0"
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            {/* Left Column */}
            <View style={styles.column}>
              <Text style={styles.label}>Nombre d'adultes:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 1"
                editable={false}
                value={
                  SelectedReservation.adultCount
                    ? SelectedReservation.adultCount.toString()
                    : "0"
                }
              />
            </View>
            {/* Right Column */}
            <View style={styles.column}>
              <Text style={styles.label}>Nombre d'enfants:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 2"
                editable={false}
                value={
                  SelectedReservation.childCount
                    ? SelectedReservation.childCount.toString()
                    : "0"
                }
              />
            </View>
          </View>

          <View style={styles.row}>
            {/* Left Column */}
            <View style={styles.column}>
              <Text style={styles.label}>Nombre de bébés:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 1"
                editable={false}
                value={
                  SelectedReservation.babyCount
                    ? SelectedReservation.babyCount.toString()
                    : "0"
                }
              />
            </View>
            {/* Right Column */}
            <View style={styles.column}>
              <Text style={styles.label12}>Nombre de handicapées:</Text>
              <TextInput
                style={styles.input}
                placeholder="Input 2"
                editable={false}
                value={
                  SelectedReservation.disabledCount
                    ? SelectedReservation.disabledCount.toString()
                    : "0"
                }
              />
            </View>
          </View>
          <View style={styles.rowprix}>
            <Text style={styles.label}>Prix total:</Text>
            <TextInput
              style={styles.inputprix}
              placeholder="Input 1"
              editable={false}
              value={SelectedReservation.price + " DT"}
            />
          </View>
          <View style={styles.separator} />
          <Text style={styles.paymentLabel}>
            Entrer votre code pour effectuer le paiement
          </Text>
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
            Nous vous envoyons ce ticket par{" "}
            <Text style={{ color: "red" }}>e-mail</Text> une fois que le
            paiement aura été effectué. L'e-mail contient également un{" "}
            <Text style={styles.underline}>QR code</Text> que vous devez montrer
            au <Text style={styles.underline}>contrôleur</Text>.
          </Text>
          <View style={styles.separator} />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirmer</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Code erroné!</Text>
                <Text style={styles.modalDescription}>
                  Vous devez entrer votre code de paiement
                </Text>
                <View style={styles.buttonContainerModal}>
                  <TouchableOpacity
                    style={[styles.buttonModal, styles.cancelButton]}
                    onPress={closeModal}
                  >
                    <Text style={styles.buttonTextModal}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    fontSize: 24,
    marginLeft: 50,
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
  label12: {
    fontSize: 11,
    color: Colors.DarkGray,
    fontFamily: "Inter",
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
    paddingHorizontal: 5,
    fontFamily: "Inter",
    fontSize: 18,

    color: Colors.Blue,
    marginTop: 5,
  },
  inputprix: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Yellow,
    height: 40,
    paddingHorizontal: 5,

    fontFamily: "Inter",
    fontSize: 22,
    textAlignVertical: "center",
    color: Colors.Blue,
    marginTop: 5,
  },
  rowprix: {
    marginVertical: 10,
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
    marginBottom: 20,
    color: "#FF5C5C",
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
    color: "#FF5C5C",
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

export default Ticket;
