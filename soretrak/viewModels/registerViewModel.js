import axios from 'axios';
import { BACKEND_URL_User } from '../configuration'; // Import the global constant

const registerViewModel = {
    createUser: async (nom, prenom, email, password, num_telephone) => {
        try {
            const userData = {
                nom,
                prenom,
                email,
                password,
                num_telephone
            };

            const response = await axios.post(`${BACKEND_URL_User}`, userData);
            console.log('User created:', response.data);
            return response.data; // Return the response data (newly created user)
        } catch (error) {
            console.error('Error creating user:', error.response.data);
            throw error; // Re-throw the error to be handled by the caller
        }
    },
    
    comparePasswords: (password, confirmPassword) => {
        return password === confirmPassword;
    },
    isValidEmail: (email) => {
        // Regular expression pattern for a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    isValidName: (name) => {
        // Regular expression pattern for a valid name format
        const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return nameRegex.test(name);
    },
    isValidPhoneNumber: (phoneNumber) => {
        // Regular expression pattern for a valid phone number format (exactly 8 numerical digits)
        const phoneRegex = /^\d{8}$/;
        return phoneRegex.test(phoneNumber);
    }
};

export default registerViewModel;



