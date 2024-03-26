import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from '@react-navigation/native';

const ManageTrajets = () => {
  const fontsLoaded = useCustomFonts(); // Load custom fonts

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const navigation = useNavigation();

  const handleAjoutNavigation = () => {
    navigation.navigate('AjouterLigne'); // Navigate to the Selectionne screen
  };
  const handleModifierNavigation = () => {
    navigation.navigate('ModifierLigne'); // Navigate to the Selectionne screen
  };
  const handleClients = () => {
    navigation.navigate('AdminChoice'); // Navigate to the Selectionne screen
  };


  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        <Text style={styles.itimText}>Gérer </Text>
        <Text style={styles.sedText}>ligne</Text>
      </Text>

      {/* Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleClients}>
        <Text style={styles.addButtonText}>Retour</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAjoutNavigation}>
        <Text style={styles.addButtonText}>Ajouter Ligne</Text>
      </TouchableOpacity>
      

      <ScrollView style={{ flex: 1, marginTop: 20 }}  showsVerticalScrollIndicator={false}>
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
         

              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Kairouan-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity onPress={handleModifierNavigation}>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.cellText}>311</Text>
                <Text style={styles.cellText}>Test-Msaken-Sousse</Text>
                <Text style={styles.cellText}>06:30</Text>
                <Text style={styles.cellText}>08:30</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity>
                    <Image source={require("../assets/edit.png")} style={styles.editIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            
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
    width: '18%',
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
