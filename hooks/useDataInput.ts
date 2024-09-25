
import { useReducer, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import useHandleClicks from './useHandleClicks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {InitialCitizen,reducerCitizen} from '@/app/types/user'
import {handleBirthdayChange} from '@/app/utils/validateUser'
import {userSubmit, updateUser, getUser} from '@/app/services/userservice'
import {BarangayReducer,InitialBarangay} from '@/app/types/barangay'
import {submitBarangay} from '@/app/services/barangayservice'
import  {validateLogin,validateName,validateBirthday,validatePassword, validateBarangayAndSitio,validateUsernamePhoto, validatePhotos} from '@/app/utils/validateUser'

const useCheckPassword = () => {
  const navigation = useNavigation();
  const {onFileChange, onFileUpload} = useHandleClicks();

  const[barangaySitioError, setbarangaySitioError] = useState<string | null>(null);
  const[barangay,setBarangay] = useState<string | null>(null);
  const [sitio,setSitio] =  useState<string | null>(null);
  

   // State to store image URIs and base64 data for each photo
   const [photoUri1, setPhotoUri1] = useState<string | null>(null);
   const [photoBase641, setPhotoBase641] = useState<string | null>(null);
 
   const [photoUri2, setPhotoUri2] = useState<string | null>(null);
   const [photoBase642, setPhotoBase642] = useState<string | null>(null);
 
   const [photoUri3, setPhotoUri3] = useState<string | null>(null);
   const [photoBase643, setPhotoBase643] = useState<string | null>(null);

   const [photoUri4, setPhotoUri4] = useState<string | null>(null);
   const [photoBase644, setPhotoBase644] = useState<string | null>(null);

  const [usernamePhotoError,setUsernamePhotoError] = useState<string | null>(null);


  // user
  const [state,dispatch] = useReducer(reducerCitizen, InitialCitizen);

  const handleChangeState = (key: string, value: string | number) => {
    dispatch({
      actionType: 'input',
      data: { [key]: value }, 
    });
  };

 
  

  

   // barangay and sitio

   const handleSitioChange = (text: any) => {
    setSitio(text)
    const validationError = validateBarangayAndSitio(barangay,text)
    setbarangaySitioError(validationError)
    console.log("Chosen sitio: " + sitio)
  }

  const handleBarangayChange = (text: any) => {
    setBarangay(text)
    const validationError = validateBarangayAndSitio(text, sitio)
    setbarangaySitioError(validationError)
    console.log("Chosen barangay: " + barangay)
  }

 


  const onBirthdayChange = (text: string) => {
    handleBirthdayChange(text, state.birthdate ? state.birthdate.toString() : null, dispatch);
  };
  

  const handleNextPress = async () => {
    try {
      // Validate the user inputs before proceeding
      const nameError = validateName(state.firstname ?? '', state.middlename ?? '', state.lastname ?? '');
      const passwordError = validatePassword(state.password, state.repassword);
      const birthdayError = validateBirthday(state.birthdate ? state.birthdate.toString() : '');
      const barangaySitioError = validateBarangayAndSitio(barangay, sitio);

      if (nameError || passwordError || birthdayError || barangaySitioError) {
        // If there's an error, update the state to show the error message
        dispatch({
          actionType: 'error',
          data: {
            error: nameError || passwordError || birthdayError || barangaySitioError, // Set the first encountered error
          },
        });
        return; // Prevent navigation if there are errors
      }
  
      // Clear the error if validation passes
      dispatch({
        actionType: 'input',
        data: {
          error: null,
        },
      });
  
      // Submit the user data
      await userSubmit(state, dispatch);
  
      // Submit barangay and sitio
      const barangayResponse = await axios.post('http://192.168.100.127:3000/barangay/submit', {
        barangayname: barangay,
        sitio,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Barangay data saved:', barangayResponse.data);
  
      // Navigate to the next screen only if all validation passes
      navigation.navigate('CitizenPhoto' as never);
      
    } catch (error: any) {
      handleAxiosError(error);
    }
  };
  

  // username and photo

  const handleConfirmUsernamePhoto = async () => {
    try {
      // Validate the username and photo
      const usernamePhotoError = validateUsernamePhoto(state.username ?? '', photoUri4);
  
      if (usernamePhotoError) {
        // If there's an error, update the state to show the error message
        dispatch({
          actionType: 'error',
          data: {
            error: usernamePhotoError,
          },
        });
        return; // Prevent navigation if there's an error
      }
  
      // Clear the error if validation passes
      dispatch({
        actionType: 'input',
        data: {
          error: null,
        },
      });
  
      // Update the user information
      await updateUser(state.username ?? 'Lebron James', dispatch);
  
      // Navigate to the next screen only if validation passes
      navigation.navigate('CitizenLogin' as never);
      
    } catch (error: any) {
      handleAxiosError(error);
    }
  };
  
  
  // citizen login

  const handleCitizenLogin = async () => {
    try {

      const error = validateLogin(state.username ?? '', state.password ?? '');
  
      if (error) {
        dispatch({
          actionType: 'error',
          data: {
            error: error,
          },
        });
        return;
      }
  
      dispatch({
        actionType: 'input',
        data: {
          error: null,
        },
      });
  
      await getUser(state.username ?? 'Lebron James', state.password ?? 'Lebron', dispatch);
      navigation.navigate('index' as never);
  
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch({
          actionType: 'error',
          data: {
            error: 'Username or Password is incorrect',
          },
        });
      } else {
        handleAxiosError(error);
      }
    }
  };
  
  

  // for photo

  
  const handlePhotoSelection = async (
    setUri: React.Dispatch<React.SetStateAction<string | null>>, 
    setBase64: React.Dispatch<React.SetStateAction<string | null>>, 
    source: 'camera' | 'library', 
    photoKey: string
  ) => {
    try {
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.status !== 'granted') {
          alert('Camera access is required to take photos.');
          return;
        }
      }

      let result = source === 'camera'
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
          });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        setUri(selectedImage.uri || null);
        setBase64(selectedImage.base64 || null);

        // Simulate an event object to pass to onFileChange
        const fileEvent = {
          target: {
            files: [{ uri: selectedImage.uri, base64: selectedImage.base64 }],
          },
        };

        
        onFileChange(fileEvent, photoKey);
      }
    } catch (error) {
      console.error('Error handling photo:', error);
    }
  };

  const handleCitizenPhotoNext = () => {
    const error = validatePhotos(photoUri1, photoUri2, photoUri3); // Pass the photo URIs directly
  
    if (error) {
      // If there's an error, update the state to show the error message
      dispatch({
        actionType: 'error',
        data: {
          error: error,
        },
      });
      return; // Prevent navigation if there's an error
    }
  
    // Proceed with the photo upload if there's no error
    handleUploadPhotos();
  
    // Clear the error if validation passes
    dispatch({
      actionType: 'input',
      data: {
        error: null,
      },
    });
  
    // Navigate to the next screen
    navigation.navigate('UsernamePhoto' as never);
  };
  

  // Functions for specific photo inputs
  const handleTakePhoto1 = () => handlePhotoSelection(setPhotoUri1, setPhotoBase641, 'camera', 'photo1');
  const handleSelectPhoto1 = () => handlePhotoSelection(setPhotoUri1, setPhotoBase641, 'library', 'photo1');

  const handleTakePhoto2 = () => handlePhotoSelection(setPhotoUri2, setPhotoBase642, 'camera', 'photo2');
  const handleSelectPhoto2 = () => handlePhotoSelection(setPhotoUri2, setPhotoBase642, 'library', 'photo2');

  const handleTakePhoto3 = () => handlePhotoSelection(setPhotoUri3, setPhotoBase643, 'camera', 'photo3');
  const handleSelectPhoto3 = () => handlePhotoSelection(setPhotoUri3, setPhotoBase643, 'library', 'photo3');

  const handleSelectPhoto4 = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });
  
      console.log("ImagePicker Result: ", result);
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        console.log("Selected Image: ", selectedImage);
        setPhotoUri4(selectedImage.uri || null);
        setPhotoBase644(selectedImage.base64 || null);
      } else {
        console.log("No image selected or operation was canceled.");
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
    }
  };
  
  // Function to handle file uploads
  const handleUploadPhotos = () => {
    const photos = [
      { uri: photoUri1, base64: photoBase641, key: 'photo1' },
      { uri: photoUri2, base64: photoBase642, key: 'photo2' },
      { uri: photoUri3, base64: photoBase643, key: 'photo3' },
    ];

    // Trigger onFileUpload for each photo if available
    photos.forEach(photo => {
      if (photo.uri && photo.base64) {
        onFileUpload(photo.uri, photo.key);  // Pass the photo URI and key (e.g., 'photo1')
      }
    });

    navigation.navigate('UsernamePhoto' as never);
  };

  const handleAxiosError = (error: any) => {
    if (error.response) {
    console.error('Response error:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    } else if (error.request) {
    console.error('Request error:', error.request);
    } else {
    console.error('General error:', error.message);
    }
    console.error('Error config:', error.config);
};

  return {
   
    handleNextPress,
    sitio,
    barangay,
   
    handleBarangayChange, 
    handleSitioChange, 
    setBarangay, 
    setSitio,
    barangaySitioError,

    handleTakePhoto1,
    handleTakePhoto2,
    handleTakePhoto3,
    handleSelectPhoto1,
    handleSelectPhoto2,
    handleSelectPhoto3,
    handleUploadPhotos,
    
    photoUri4,
    setPhotoUri4,
    setPhotoBase644,
    handleSelectPhoto4,
    usernamePhotoError,
    handleConfirmUsernamePhoto,

    
    handleCitizenLogin,
    handleChangeState,
    state,
    onBirthdayChange,

    handleCitizenPhotoNext
  };
};

export default useCheckPassword;