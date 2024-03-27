import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL_ligne } from '../configuration'; // Import the global constant
import axios from 'axios';

class LigneService {
    async getLignes() {
    try {
      const response = await axios.get(`${BACKEND_URL_ligne}/numligne`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lignes:', error);
      throw error;
    }
  }

  async getLignesByLigneName(ligneName) {
    try {
      const requestOptions = {
        method: 'POST', // Use POST method to send ligneName in the request body
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ligneName }), // Send ligneName in the request body as JSON
      };
  
      // Construct the complete URL for the API endpoint
      const url = `${BACKEND_URL_ligne}/name`;
  
      // Send a POST request to the API endpoint with the appropriate options
      const response = await fetch(url, requestOptions);
  
      // Check if the response is successful
      if (!response.ok) {
        // If response is not successful, throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response data as JSON
      const data = await response.json();
      console.log(data);
      // Return the data from the response
      return data;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching lignes by ligne name:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  
  
}

export default LigneService;
