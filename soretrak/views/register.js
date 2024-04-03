import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import Colors from "../assets/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons
import useCustomFonts from "../assets/fonts"; // Assuming useCustomFonts.js is in the same directory
import { useNavigation } from '@react-navigation/native';
import registerViewModel from '../viewModels/registerViewModel'; // Import the view model
const Register = () => {
    const fontsLoaded = useCustomFonts(); // Use the custom hook
    if (!fontsLoaded) {
        return null; // Or you can render a loading indicator here
      }
    const navigation = useNavigation();

  const handleLoginPress = () => {
    setShowModal(false); 
    navigation.navigate('Login'); // Navigate to the login screen
  };
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const [showModal, setShowModal] = useState(false); // State to control modal visibility



    const [name, setName] = useState('');
    const [prenom, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    var [errorText, setErrorText] = useState('');

    const SignupComplete = () => {
        setShowModal(true); // Show the modal
    };
    const closeModal = () => {
        setShowModal(false); // Close the modal
        //handleLoginPress(); // Navigate to the login screen
    };



    const signup = async () => {
        try {

            setErrorText('')
            if ((name == '') || (prenom == '') || (email == '') || (password == '') || (confirmPassword == '') || (tel == '')) {
                setErrorText("*Remplir tous les champs avant de s'inscrire")
                setIsErrorVisible(true);
                return
            }
            if (!registerViewModel.isValidName(name)) {
                setErrorText('*Veuillez saisir un nom valide')
                setIsErrorVisible(true);
                return
            }
            if (!registerViewModel.isValidName(prenom)) {
                setErrorText('*Veuillez saisir un nom de famille valide')
                setIsErrorVisible(true);
                return
            }
            if (!registerViewModel.isValidEmail(email)) {
                setErrorText('*Veuillez saisir un email valide')
                setIsErrorVisible(true);
                return
            }
            if (!registerViewModel.comparePasswords(password, confirmPassword)) {
                setErrorText('*Vos mots de passe ne correspondent pas')
                setIsErrorVisible(true);
                return
            }
            if (!registerViewModel.isValidPhoneNumber(tel)) {
                setErrorText('*Veuillez vérifier votre numéro de téléphone')
                setIsErrorVisible(true);
                return
            }
            const newUser = await registerViewModel.createUser(name, prenom, email, password, tel);
            console.log('User created successfully:', newUser);
            SignupComplete();
        } catch (error) {
            console.error('Error creating user:', error.response.data);
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                <Text style={styles.itimText}>Créer votre</Text>
                <Text style={styles.sedText}> espace personnel</Text>
            </Text>
      
            <View style={styles.inputContainer}>

                <TextInput
                    style={[styles.input, styles.firstInput]} 
                    placeholder="Prénom"
                    placeholderTextColor={Colors.Gray}
                    onChangeText={setName}
                />
                <TextInput
                    style={[styles.input, styles.secondInput]} 
                    placeholder="Nom"
                    placeholderTextColor={Colors.Gray}
                    onChangeText={setFname}
                />
            </View>
          
        

            <View style={styles.inputContainer}>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={Colors.Gray}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputContainer}>
           
                <TextInput
                    style={styles.input}
                    placeholder="Téléphone"
                    placeholderTextColor={Colors.Gray}
                    onChangeText={setTel}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor={Colors.Gray}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIconContainer}
                >
                    <MaterialCommunityIcons
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={24}
                        color={Colors.Gray}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Confirmer le mot de passe"
                    placeholderTextColor={Colors.Gray}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isPasswordVisible}
                />
            </View>
            <View style={styles.errorContrainer}>
                    <Text style={styles.error}>{errorText}</Text>
                </View>
           
            <TouchableOpacity style={styles.button} onPress={signup}>
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLoginPress}>
        <Text style={styles.linkText}>Vous avez déjà un compte? Connecter</Text>
      </TouchableOpacity>
      
            <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Inscription terminée</Text>
            <Text style={styles.modalDescription}>
            Votre compte a été créé avec succès. Allez-y et connectez-vous.
            </Text>
            <View style={styles.buttonContainerModal}>
              <TouchableOpacity
                style={[styles.buttonModal, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.buttonTextModal}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonModal, styles.connectButton]}
              >
                <Text style={styles.buttonTextModal} onPress={handleLoginPress}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
    },
    error: {
        //fontFamily: 'Bold',
        fontSize: 12,
        textAlign: "center",
        color: "#FF5C5C",
      },
      errorContrainer: {
        alignItems: "center",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
      },
    firstInput: {
        marginRight: 10,
    },
    secondInput: {
        marginRight: 0,
    },
    linkText: {
        fontSize: 16,
        textDecorationLine: 'underline',
        color: Colors.Yellow,
        marginTop: 20,
      },
    title: {
        fontSize: 36,
        fontFamily: "Sed",
        color: Colors.Blue,
        marginBottom: 20,
        bottom: 10,
        textAlign: 'center'
        },
        BigContainer: {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginBottom: 20,
        },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
    },
    inputIcon: {
        width: 24,
        height: 24,
        position: "absolute",
        left: 15,
        zIndex: 1,
    },
    input: {
        flex: 1,
        height: 60,
        borderWidth: 1,
        borderColor: Colors.Gray,
        borderRadius: 12,
        paddingLeft: 20, // Adjust padding to accommodate icon width
        fontSize: 16,
        fontFamily: "Inter",
        color: Colors.Black,
        backgroundColor: Colors.PastelBlue,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: Colors.Blue,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: "Itim",
        color: Colors.White,
    },
    itimText: {
        fontFamily: "Itim",
        color: Colors.Blue,
    },
    eyeIconContainer: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -12 }],
    },
    sedText: {
        fontFamily: "Sed",
        color: Colors.Yellow,
    },
    //Modal stuff
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  modalView: {
    backgroundColor: Colors.PastelBlue,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainerModal: {
    flexDirection: "row",
  },
  buttonModal: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: Colors.Gray,
  },
  connectButton: {
    backgroundColor: Colors.Yellow,
  },
  buttonTextModal: {
    fontSize: 16,
    color: Colors.Black,
  },
});

export default Register;
