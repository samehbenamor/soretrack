import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL_ligne } from '../configuration'; // Import the global constant
import axios from 'axios';

class LigneService {
    async getLignes() {
    try {
      const response = await axios.get(BACKEND_URL_ligne);
      return response.data;
    } catch (error) {
      console.error('Error fetching lignes:', error);
      throw error;
    }
  }
}

export default LigneService;
