import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from './assets/colors'; // Import Colors.js
import trajet from './views/trajet'; // Import 'trajet.js
import ListTrajet from './views/listtrajet';
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer  >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="VotreTrajet" component={trajet} />
        <Stack.Screen name="List" component={ListTrajet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
