import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import trajet from "./views/trajet"; // Import 'trajet.js
import ListTrajet from "./views/listtrajet";
import Selectionne from "./views/selectionne";
import Login from "./views/login"; // Import 'login.js'
import Register from "./views/register"; // Import 'register.js'
import Ticket from "./views/ticket"; // Import 'ticket.js'
import AdminChoice from "./views/adminchoice";
import ManageTrajets from "./views/managetrajets";
import AjouterLigne from "./views/ajouterligne";
import ModifierLigne from "./views/modifierligne";
import ManageClients from "./views/manageclients"; // Import ManageClients


import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createStackNavigator();
  const AuthStack = createStackNavigator();
  useEffect(() => {
    const clearSessionVariables = async () => {
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
    };
    // Call the function to clear session variables when the app starts
    clearSessionVariables();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VotreTrajet" component={trajet} />
      <Stack.Screen name="AdminChoice" component={AdminChoice} />
        
        <Stack.Screen name="ManageTrajets" component={ManageTrajets} />
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="Register" component={Register} />
        

        <Stack.Screen name="AjouterLigne" component={AjouterLigne} />
        <Stack.Screen name="ModifierLigne" component={ModifierLigne} />
        <Stack.Screen name="ManageClients" component={ManageClients} />

        <Stack.Screen name="List" component={ListTrajet} />
        <Stack.Screen name="Selectionne" component={Selectionne} />
        <Stack.Screen name="Ticket" component={Ticket} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
