import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SelectList } from "react-native-dropdown-select-list";
import ListTrajet from "./listtrajet";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from "@react-navigation/native";
import LigneService from "../viewModels/generalfile.js";
const Trajet = () => {
  const fontsLoaded = useCustomFonts(); // Load custom fonts

  const [selectedLineType, setSelectedLineType] = useState("Interurban"); // State for radio button selection
  const navigation = useNavigation();

  const handleRadioChange = (value) => {
    setSelectedLineType(value);
  };

  const [selectedLigne, setSelectedLigne] = useState(""); // State for selected ligne
  const [lignes, setLignes] = useState([]);
  const [selected, setSelected] = useState("");
  const [stationFrom, setStationFrom] = useState(""); // State for station from
  const [stationTo, setStationTo] = useState(""); // State for station to
  const [disableStations, setDisableStations] = useState(true); // State to enable/disable station select lists
  var [errorText, setErrorText] = useState("");
  const [stationFromLigne, setStationFromLigne] = useState(""); // State for station from
  const [stationToLigne, setStationToLigne] = useState(""); // State for station from

  const [userSession, setUserSession] = useState(null);
  useEffect(() => {
    // Fetch lignes when component mounts
    const fetchLignes = async () => {
      try {
        const viewModel = new LigneService();
        const data = await viewModel.getLignes();
        setLignes(data); // Set the fetched lignes to state
      } catch (error) {
        console.error("Error fetching lignes:", error);
        // Handle error
      }
    };
    fetchLignes();
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
  const [isUser, setIsUser] = useState(false); // State to track if user is a regular user

  useEffect(() => {
    // Check if user's role is "user"
    if (userSession?.role === "user") {
      setIsUser(true); // Set state to indicate user is a regular user
    } else {
      setIsUser(false); // Set state to indicate user is not a regular user
    }
  }, [userSession]);
  const handleRecherche = async () => {
    if (!selectedLigne) {
      setErrorText("*Veuillez choisir une ligne."); // Set error message if no value selected
      return false; // Return false to indicate validation failure
    }
    if (!stationFromLigne) {
      setErrorText("*Veuillez choisir une station de depart."); // Set error message if no value selected
      return false; // Return false to indicate validation failure
    }
    if (!stationToLigne) {
      setErrorText("*Veuillez choisir une station de retour."); // Set error message if no value selected
      return false; // Return false to indicate validation failure
    }

    //stationFromLigne
    //stationToLigne
    // Save selected data in AsyncStorage
    try {
      await AsyncStorage.setItem(
        "selectedData",
        JSON.stringify({ selectedLigne, stationFromLigne, stationToLigne })
      );
      // Navigate to the desired screen
      navigation.push("List");
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
      // Handle error
    }
  };
  const NavigateToLogin = () => {
    navigation.replace("Login"); // Navigate to the login screen within the AuthScreens navigator
  };
  //handleDashboard
  const handleDashboard = () => {
    navigation.navigate("AdminChoice"); // Navigate to the login screen
  };
  const NavigateToRegister = () => {
    navigation.replace("Register"); // Navigate to the login screen
  };
  const handleLigneChange = (value) => {
    setSelected(value);
    const stations = value.split(" - "); // Split selected ligne by ' - '
    setStationFrom(stations[0]);
    setStationTo(stations.length === 3 ? stations[2] : stations[1]); // Set stationTo based on the length of the split array
    setDisableStations(false); // Enable station select lists
  };
  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  const handleLogout = async () => {
    try {
      console.log("Log out should be successful.");
      try {
        // Check if there are any session variables
        const keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          // Clear all session variables
          await AsyncStorage.clear();
          console.log("Session variables cleared successfully.");
        } else {
          console.log("No session variables to clear.");
        }
      } catch (error) {
        console.error("Error clearing session variables:", error);
      }
      setUserSession(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.itimText}>Votre</Text>
        <Text style={styles.sedText}>Trajet</Text>
      </Text>
      <Text style={styles.subTitle}>Choisir type de la ligne</Text>

      {/* Radio Button and Label */}
      <View style={styles.radioButtonContainer}>
        <Image
          source={require("../assets/interurban.png")}
          style={styles.image}
        />
        <TouchableOpacity
          style={[
            styles.radioButton,
            selectedLineType === "Interurban" && styles.radioButtonSelected,
          ]}
          onPress={() => handleRadioChange("Interurban")}
        >
          {selectedLineType === "Interurban" && (
            <View style={styles.radioButtonInner} />
          )}
        </TouchableOpacity>
        <Text style={styles.radioButtonLabel}>Interurban</Text>
      </View>
      <Text style={styles.secondSubTitle}>Choisir la ligne</Text>
      <View style={styles.imagenexttoselect}>
        <Image
          source={require("../assets/direction.png")}
          style={styles.directionImage}
        />
        <View style={styles.selectContainer}>
          <SelectList
            setSelected={(value) => {
              setSelectedLigne(value);
              handleLigneChange(value); // Optionally call your existing handler if needed
            }}
            placeholder="Selectionner votre ligne"
            searchPlaceholder="Rechercher une ligne"
            data={lignes.map((ligne) => ({
              key: ligne.num,
              value: ligne.ligne,
            }))} // Map lignes to SelectList data format
            save="value"
            boxStyles={{ backgroundColor: "white" }}
            dropdownItemStyles={{ backgroundColor: "white" }}
          />
        </View>
      </View>
      <Text style={styles.thirdSubTitle}>Choisir les stations</Text>
      <View style={styles.imageAndLists}>
        <Image
          source={require("../assets/fromto.png")}
          style={styles.fromToImage}
        />
        <View style={styles.columnial}>
        <View style={styles.selectContainerTwo}>
          <SelectList
            setSelected={(val) => {
              setSelected(val);
              setStationFromLigne(val);
            }}
            data={[
              { key: "1", value: stationFrom }, // Show stationFrom
              { key: "2", value: stationTo }, // Show stationTo
            ]}
            save="value"
            searchPlaceholder="Rechercher une station"
            placeholder="Station depart"
            boxStyles={{ backgroundColor: "white" }}
            dropdownItemStyles={{ backgroundColor: "white" }}
            dropdownStyles={{ backgroundColor: "white" }}
            disabled={disableStations || !stationFrom} // Disable until a ligne is selected or stationFrom is set
          />
        </View>
        <View style={styles.selectContainerThree}>
          <SelectList
            setSelected={(val) => {
              setSelected(val);
              setStationToLigne(val);
            }}
            data={[
              {
                key: "1",
                value: selected === stationFrom ? stationTo : stationFrom,
              }, // Show the remaining station based on the selected value
            ]}
            save="value"
            placeholder="Station Retour"
            searchPlaceholder="Rechercher une station"
            boxStyles={{ backgroundColor: "white" }}
            dropdownItemStyles={{ backgroundColor: "white" }}
            disabled={disableStations || !stationFrom} // Disable until a ligne is selected or stationFrom is set
          />
        </View>
        
        </View>
      </View>
      <View style={styles.errorContrainer}>
        <Text style={styles.error}>{errorText}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* Button 1 */}
        <TouchableOpacity style={styles.searchButton} onPress={handleRecherche}>
          <Text style={styles.searchButtonText}>Recherche</Text>
        </TouchableOpacity>
        {userSession ? (
          <View style={styles.loggedInSection}>
            <Text style={styles.loggedInText}>
              Connecté en tant que{" "}
              <Text style={styles.loggedInUserName}> {userSession.name}</Text>
            </Text>
            {userSession?.role == "user" && (
              <TouchableOpacity
                style={styles.logoutButtonBonus}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Déconnexion</Text>
              </TouchableOpacity>
            )}
            {userSession?.role !== "user" && (
              <View style={styles.sign}>
                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.testext}>Déconnexion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleDashboard}
                >
                  <Text style={styles.testext}>Dashboard</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          // If no user session, display signup and login buttons
          <View style={styles.loggedInSection}>
            <TouchableOpacity
              style={styles.logoutButtonBonus}
              onPress={NavigateToRegister}
            >
              <Text style={styles.signInButtonText}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButtonBonus}
              onPress={NavigateToLogin}
            >
              <Text style={styles.loginButtonText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* Select list */}
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: 30,
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: Colors.White,

  },
  imageAndLists: {
    flexDirection: "row",
  },
  loggedInSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  loggedInText: {
    color: Colors.Blue,
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Sed",
  },
  loggedInUserName: {
    color: Colors.Yellow,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Sed",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: Colors.Blue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontFamily: "Itim",
    fontSize: 36,
  },
  error: {
    fontSize: 12,
    textAlign: "center",
    color: "#FF5C5C",
  },
  imagenexttoselect: {
    position: "relative",
    flexDirection: "row", // Set flexDirection to row to place items horizontally
    alignItems: "center",
  },
  errorContrainer: {
    margin: 20,
  },
  title: {
    fontSize: 48,
    marginTop: 20,
    textAlign: "center", // Center the text horizontally
    justifyContent: "center", // Center the text vertically // Take up available vertical space
  },
  itimText: {
    fontFamily: "Itim",
    color: Colors.Blue,
  },
  sedText: {
    fontFamily: "Sed",
    color: Colors.Yellow,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 30,
    fontFamily: "Ink",
  },
  secondSubTitle: {
    fontSize: 20,
    fontFamily: "Ink",
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.Black,
    backgroundColor: Colors.White,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: Colors.Blue,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.Blue,
  },
  radioButtonLabel: {
    fontSize: 16,
    fontFamily: "Ink",
    color: Colors.Black,
  },
  image: {
    width: 46,
    height: 46,
    marginRight: 10,
  },
  directionImage: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  selectContainer: {
    flex: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  thirdSubTitle: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: "Ink",
  },
  fromToImage: {
    width: 43,
    height: 139,
    marginRight: 10,
  },
  columnial: {
    marginTop: 10,
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  selectContainerTwo: {
    /*width: "100%",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,*/
    flex: 1, 
    marginBottom: 30,
    
  },
  selectContainerThree: {
    /*width: "100%",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,*/
    flex: 1, // Take up remaining space
  },
  buttonContainer: {
    width: "100%",
  },
  searchButton: {
    backgroundColor: Colors.Blue,
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  logoutButtonBonus: {
    backgroundColor: Colors.Yellow,
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
  },
  searchButtonText: {
    fontFamily: "Itim",
    fontSize: 36,
    color: Colors.White,
  },
  signInButton: {
    backgroundColor: Colors.Yellow,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  signInButtonText: {
    fontFamily: "Itim",
    fontSize: 36,
    color: Colors.White,
  },
  testext: {
    fontFamily: "Itim",
    fontSize: 20,
    color: Colors.White,
  },
  loginButton: {
    backgroundColor: Colors.Yellow,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },
  loginButtonText: {
    fontFamily: "Itim",
    fontSize: 36,
    color: Colors.White,
  },
  sign: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
});

export default Trajet;
