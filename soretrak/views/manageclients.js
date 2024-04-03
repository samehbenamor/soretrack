import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import Colors from "../assets/colors"; // Assuming Colors.js defines color styles
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from '@react-navigation/native';
import LigneService from "../viewModels/generalfile.js";
import SnackBar from "react-native-snackbar-component";

const ManageClients = () => {
  const fontsLoaded = useCustomFonts(); // Load custom fonts

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userService = new LigneService();
        const userData = await userService.getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const [users, setUsers] = useState([]);
  const handleDeleteUser = async (userId) => {
    try {
      const userService = new LigneService();
      await userService.deleteUser(userId);
      // Handle successful deletion, such as updating the UI or showing a message
      console.log('User deleted successfully');
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error, such as showing an error message to the user
    }
  };
  const handleGestionClientPress = () => {
    navigation.navigate('AdminChoice');
};
  return (
    <View style={styles.container}>
      <SnackBar
        visible={isVisible}
        backgroundColor="#FFCE03"
        messageColor="#2A3869"
        textMessage="User supprimée avec succès."
        autoHidingTime={2000}
        top={30}
      />
      {/* Title */}
      <Text style={styles.title}>
        <Text style={styles.itimText}>Gérer données </Text>
        <Text style={styles.sedText}>des clients</Text>
      </Text>

      <TouchableOpacity style={styles.addButton} onPress={handleGestionClientPress}>
        <Text style={styles.addButtonText}>Retour</Text>
      </TouchableOpacity>
      <ScrollView style={{ flex: 1, marginTop: 20 }}  showsVerticalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.tableView}>
            <View style={styles.tableHeader}>
              {/* Wrap header text in Views */}
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Nom</Text>
              </View>
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Prenom</Text>
              </View>
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Tel</Text>
              </View>
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Email</Text>
              </View>
              <View style={{ flex: 1, flexShrink: 1 }}>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            </View>
            {users.map((user) => (
              <View style={styles.tableRow} key={user._id}>
                <Text style={styles.cellText}>{user.nom}</Text>
                <Text style={styles.cellText}>{user.prenom}</Text>
                <Text style={styles.cellText}>{user.num_telephone}</Text>
                <Text style={styles.cellText}>{user.email}</Text>
                <View style={styles.actionIcons}>
                  <TouchableOpacity onPress={() => handleDeleteUser(user._id)}>
                    <Image source={require("../assets/trash.png")} style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
    fontSize: 36,
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
  },
  trashIcon: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
});

export default ManageClients;
