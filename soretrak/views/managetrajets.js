import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from "@react-navigation/native";
import LigneService from "../viewModels/generalfile.js";
//TO DO, work on snackbar message after successful deletion.
import SnackBar from "react-native-snackbar-component";

const ManageTrajets = () => {
  const fontsLoaded = useCustomFonts(); // Load custom fonts

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const handleAjoutNavigation = () => {
    navigation.navigate("AjouterLigne"); // Navigate to the Selectionne screen
  };

  const handleClients = () => {
    navigation.navigate("AdminChoice"); // Navigate to the Selectionne screen
  };
  const [lignes, setLignes] = useState([]);
  useEffect(() => {
    fetchLignes();
  }, []);
  const fetchLignes = async () => {
    try {
      const ligneService = new LigneService();
      const allLignes = await ligneService.getAllLignes();
      setLignes(allLignes);
    } catch (error) {
      console.error("Error fetching lignes:", error);
    }
  };
  const handleModifierNavigation = (ligneData) => {
    // Navigate to the ModifierLigne screen with the ligne data
    navigation.navigate("ModifierLigne", { ligneData });
  };
  const handleDeleteLigne = async (id) => {
    try {
      const ligneService = new LigneService();

      await ligneService.deleteLigne(id);
      setLignes((prevLignes) => prevLignes.filter((ligne) => ligne._id !== id));
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error("Error deleting ligne:", error);
    }
  };
  const distanceCallback = (distance) => {
    // You can log the distance or perform any other actions based on it
    console.log("Distance taken up by snackbar:", distance);
    // Set a large number for the distance to ensure that the snackbar takes up sufficient space
    return 1000; // Set a large number here, for example, 1000
  };

  return (
    <View style={styles.container}>
      <SnackBar
        visible={isVisible}
        backgroundColor="#2A3869"
        messageColor="#FFCE03"
        textMessage="Ligne supprimée avec succès."
        autoHidingTime={2000}
        top={30}
      />

      {/* Title */}
      <Text style={styles.title}>
        <Text style={styles.itimText}>Gérer </Text>
        <Text style={styles.sedText}>ligne</Text>
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleClients}>
        <Text style={styles.addButtonText}>Retour</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAjoutNavigation}
      >
        <Text style={styles.addButtonText}>Ajouter Ligne</Text>
      </TouchableOpacity>

      <ScrollView
        style={{ flex: 1, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tableContainer}>
          <View style={styles.tableView}>
            <View style={styles.tableHeader}>
              {/* Wrap header text in Views */}
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Ligne N°</Text>
              </View>
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Ligne</Text>
              </View>
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Heure de départ</Text>
              </View>
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Heure de retour</Text>
              </View>
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            </View>

            {lignes.map((ligne) => (
              <View style={styles.tableRow} key={ligne._id}>
                <Text style={styles.cellText}>{ligne.num}</Text>
                <Text style={styles.cellText}>{ligne.ligne}</Text>
                <Text style={styles.cellText}>{ligne.heure_départ}</Text>
                <Text style={styles.cellText}>{ligne.heure_retour}</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity
                    onPress={() => handleModifierNavigation(ligne)}
                  >
                    <Image
                      source={require("../assets/edit.png")}
                      style={styles.editIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteLigne(ligne._id)}
                  >
                    <Image
                      source={require("../assets/trash.png")}
                      style={styles.trashIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Add more rows as needed */}
          </View>
        </View>
      </ScrollView>
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
    fontSize: 48,
    marginLeft: 75,
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
  addButton: {
    backgroundColor: Colors.Blue,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: Colors.White,
    fontFamily: "Itim",
    fontSize: 20,
  },
  tableContainer: {
    flex: 1,
  },
  tableView: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.PastelBlue,
    borderRadius: 10, // Distribute headers evenly
    paddingVertical: 10,
    marginBottom: 5,

    paddingHorizontal: 5, // Adjusted for spacing // Add background color to header
  },
  headerText: {
    fontFamily: "Inter",
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "bold", // Make header text bold
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center", // Vertically center cell content
    paddingVertical: 15, // Adjust padding for better spacing
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: Colors.Grey,
  },
  cellImage: {
    width: 50, // Adjusted for smaller image size
    height: 30,
    marginRight: 10, // Add a margin for spacing
  },
  cellText: {
    paddingLeft: 10, // Adjust padding for better spacing
    marginRight: 10,
    width: "18%",
    fontFamily: "Inter",
    fontSize: 11,
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  trashIcon: {
    width: 20,
    height: 20,
  },
});

export default ManageTrajets;
