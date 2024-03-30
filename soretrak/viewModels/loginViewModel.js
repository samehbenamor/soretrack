import axios from "axios";
import { BACKEND_URL_User } from "../configuration"; // Import the global constant
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../Models/user"; // Import the User class
import { Base } from "../configuration"; // Import the global constant

const loginViewModel = {
  Loginn: async (email, password) => {
    try {
      const userData = {
        email,
        password,
      };
      const response = await axios.post(`${BACKEND_URL_User}login`, userData);
      return response.data; // Return the response data (token)
    } catch (error) {
      if (error.response) {
        // If there is a response from the server
        if (error.response.status === 401) {
          // Handle 401 Unauthorized error
          throw new Error("Invalid email or password."); // Throw custom error message
        } else {
          // Handle other error responses
          console.error("Error Logging in:", error.response.data);
          throw error; // Re-throw the error to be handled by the caller
        }
      } else {
        // Handle network errors or other exceptions
        console.error("Error Logging in:", error.message);
        throw new Error("Something went wrong. Please try again later."); // Throw custom error message
      }
    }
  },

  saveUser: async (token) => {
    try {
      // Set authorization header with token
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      // Make request to /profile route
      const response = await axios.get(
        `${BACKEND_URL_User}profile/jwt`,
        config
      );
      console.log("Test session");
      // Extract user data from the response
      const userData = response.data;
      const user = new User(
        userData.userId,
        userData.nom,
        userData.prenom,
        userData.email,
        "", // Password is not retrieved from the profile route
        userData.num_telephone,
        userData.code_paiement,
        userData.credit,
        userData.role
      );

      // Save user object to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Error saving user:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  },
};

export default loginViewModel;
