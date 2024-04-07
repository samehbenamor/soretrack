import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL_ligne } from '../configuration'; 
import { BACKEND_URL_User } from '../configuration';// Import the global constant
import { BACKEND_URL_reservation } from '../configuration';
import { BACKEND_URL_bus } from '../configuration';
//BACKEND_URL_bus
import axios from 'axios';
//BACKEND_URL_reservation
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
  async getAllLignes() {
    try {
      const response = await axios.get(`${BACKEND_URL_ligne}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all lignes:', error);
      throw error;
    }
  }
  async updateLigne(id, updatedData) {
    try {
      const response = await axios.put(`${BACKEND_URL_ligne}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating ligne:', error);
      throw error;
    }
}
async deleteLigne(id) {
  try {
    await axios.delete(`${BACKEND_URL_ligne}/${id}`);
  } catch (error) {
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
  async decrementUserCredit(userId) {
    try {
      const response = await axios.put(`${BACKEND_URL_User}/${userId}/decrement-credit`);
      return response.data;
    } catch (error) {
      console.error('Error decrementing user credit:', error);
      throw error;
    }
  }
  
  async createLigne(ligneData) {
    try {
      const response = await axios.post(`${BACKEND_URL_ligne}`, ligneData);
      return response.data;
    } catch (error) {
      console.error('Error creating ligne:', error);
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const response = await axios.get(`${BACKEND_URL_User}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }
  async deleteUser(id) {
    try {
      await axios.delete(`${BACKEND_URL_User}/${id}`);
    } catch (error) {
      throw error;
    }
  }
  async createReservation(reservationData) {
    try {
      const response = await axios.post(`${BACKEND_URL_reservation}`, reservationData);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }
  //Bus part of the mvvm
  //Below function isn't necessary to implement.
  async generateBusesForFutureDates(endDate) {
    try {
      const response = await axios.post(`${BACKEND_URL_bus}/generate-buses/${endDate}`);
      return response.data;
    } catch (error) {
      console.error('Error generating buses for future dates:', error);
      throw error;
    }
  }
  //The whole process of generating buses for future dates is done in the backend.
  //Below function will be the main actor in all of this.
  async findBusByLigneIdAndDate(ligneId, date) {
    try {
      const response = await axios.post(`${BACKEND_URL_bus}/find-bus/${ligneId}`, { date });
      return response.data;
    } catch (error) {
      console.error('Error finding bus by ligneId and date:', error);
      throw error;
    }
  }

  async subtractFromNombrePlaces(busId, numberOfSeats) {
    try {
      const response = await axios.put(`${BACKEND_URL_bus}/subtract-seats/${busId}/${numberOfSeats}`);
      return response.data;
    } catch (error) {
      console.error('Error subtracting seats from bus:', error);
      throw error;
    }
  }

  async getNombrePlacesOfBus(busId) {
    try {
      const response = await axios.get(`${BACKEND_URL_bus}/nombre-places/${busId}`);
      return response.data.nombrePlaces;
    } catch (error) {
      console.error('Error getting nombrePlaces of bus:', error);
      throw error;
    }
  }
}

export default LigneService;
