import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"; 
import { SelectList } from 'react-native-dropdown-select-list'
import ListTrajet from './listtrajet';
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from '@react-navigation/native';
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

  

  useEffect(() => {
    // Fetch lignes when component mounts
    const fetchLignes = async () => {
      try {
        const viewModel = new LigneService();
        const data = await viewModel.getLignes();
        setLignes(data); // Set the fetched lignes to state
      } catch (error) {
        console.error('Error fetching lignes:', error);
        // Handle error
      }
    };
    fetchLignes();
  }, []);

  const data2 = [
    {key:'1', value:'Kairouan'},
    {key:'2', value:'Sousse'},
]

const data3 = [
    {key:'1', value:'Sousse'},
    {key:'2', value:'Kairouan'},
]
const handleLigneChange = (value) => {
  setSelected(value);
  const [station1, station2, station3] = value.split(' - '); // Split selected ligne by ' - '
  setStationFrom(station1);
  setStationTo(station3); // Set stationFrom to the first element of the split array
  setDisableStations(false); // Enable station select lists
};
  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.itimText}>Votre</Text>
        <Text style={styles.sedText}>Trajet</Text>
      </Text>
      <Text style={styles.subTitle}>Choisir type de la ligne</Text>

      {/* Radio Button and Label */}
      <View style={styles.radioButtonContainer}>
      <Image source={require("../assets/interurban.png")} style={styles.image} />
        <TouchableOpacity
          style={[
            styles.radioButton,
            selectedLineType === "Interurban" && styles.radioButtonSelected,
          ]}
          onPress={() => handleRadioChange("Interurban")}
        >
          {selectedLineType === "Interurban" && <View style={styles.radioButtonInner} />}
        </TouchableOpacity>
        <Text style={styles.radioButtonLabel}>Interurban</Text>
      </View>
      <Text style={styles.secondSubTitle}>Choisir la ligne</Text>
      <Image source={require("../assets/direction.png")} style={styles.directionImage} />
      <Text style={styles.thirdSubTitle}>Choisir les stations</Text>
      <View style={styles.selectContainer}>
      <SelectList
          setSelected={handleLigneChange}
          placeholder="Selectionner votre ligne"
          searchPlaceholder="Rechercher une ligne"
          data={lignes.map(ligne => ({ key: ligne._id, value: ligne.ligne }))} // Map lignes to SelectList data format
          save="value"
          boxStyles={{ backgroundColor: 'white' }}
          dropdownItemStyles={{ backgroundColor: 'white' }}
        />
     </View>
     <Image source={require("../assets/fromto.png")} style={styles.fromToImage} />
     <View style={styles.selectContainerThree}>
     <SelectList
    setSelected={(val) => setSelected(val)}
    data={[
      { key: '1', value: selected === stationFrom ? stationTo : stationFrom } // Show the remaining station based on the selected value
    ]}
    save="value"
    placeholder="Station Retour"
    searchPlaceholder="Rechercher une station"
    boxStyles={{ backgroundColor: 'white' }}
    dropdownItemStyles={{ backgroundColor: 'white' }}
    disabled={disableStations || !stationFrom} // Disable until a ligne is selected or stationFrom is set
  />
    </View>
    <View style={styles.selectContainerTwo}>
    <SelectList
    setSelected={(val) => setSelected(val)}
    data={[
      { key: '1', value: stationFrom }, // Show stationFrom
      { key: '2', value: stationTo },   // Show stationTo
    ]}
    save="value"
    searchPlaceholder="Rechercher une station"
    placeholder="Station depart"
    boxStyles={{ backgroundColor: 'white' }}
    dropdownItemStyles={{ backgroundColor: 'white' }}
    dropdownStyles={{ backgroundColor: 'white' }}
    disabled={disableStations || !stationFrom} // Disable until a ligne is selected or stationFrom is set
  />
     </View>
     <View style={styles.buttonContainer}>
  {/* Button 1 */}
  <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('List')}>
    <Text style={styles.searchButtonText}
    >Recherche</Text>
  </TouchableOpacity>
  <View style={styles.sign}>
  {/* Button 2 */}
  <TouchableOpacity style={styles.signInButton}>
    <Text style={styles.signInButtonText}>S'inscrire</Text>
  </TouchableOpacity>

  {/* Button 3 */}
  <TouchableOpacity style={styles.loginButton}>
    <Text style={styles.loginButtonText}>Se connecter</Text>
  </TouchableOpacity>
  </View>
</View>
      {/* Select list */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: 30,
    position: "relative",
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    fontFamily: "Sed",
    position: "absolute",
    top: 74,
    left: 85,
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
    position: "absolute",
    left: 39,
    top: 133,
  },
  secondSubTitle: {
    fontSize: 20,
    marginTop: 30, // Adjust spacing from the radio button container
    fontFamily: "Ink",
    left: 10,
    top: 220,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 35,
    top: 211,
    marginTop: 13,
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
        position: "absolute",
        left: 40,
        top: 340,
    },
  selectContainer: {
    width: 300,
    marginTop: 335,
    marginLeft: 80,
    position: "absolute",
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 6,
  },
  thirdSubTitle: {
    fontSize: 20,
    marginTop: 30, // Adjust spacing from the select list container
    fontFamily: "Ink",
    left: 10,
    top: 250,
  },
  fromToImage: {
    width: 43,
    height: 139,
    position: "absolute",
    left: 40,
    top: 450,
  },
  selectContainerTwo: {
    width: 300,
    marginTop: 450,
    marginLeft: 80,
    position: "absolute",
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 5,

  },   
  selectContainerThree: {
    width: 300,
    marginTop: 540,
    marginLeft: 80,
    position: "absolute",
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 4,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 450,
  
   
  },
  searchButton: {
    backgroundColor: Colors.Blue,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  searchButtonText: {
    fontFamily: 'Itim',
    fontSize: 36,
    color: Colors.White,
  },
  signInButton: {
    backgroundColor: Colors.Yellow,
    width: '48%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  signInButtonText: {
    fontFamily: 'Itim',
    fontSize: 20,
    color: Colors.Black,
  },
  loginButton: {
    backgroundColor: Colors.Yellow,
    width: '48%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    fontFamily: 'Itim',
    fontSize: 20,
    color: Colors.Black,
  },
    sign: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
  
});

export default Trajet;
