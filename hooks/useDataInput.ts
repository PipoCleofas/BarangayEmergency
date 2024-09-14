
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import useHandleClicks from './useHandleClicks';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useCheckPassword = () => {

  const {onFileChange, onFileUpload} = useHandleClicks();

  const [password, setPassword] = useState<string | null>('');
  const [reEnteredPassword, setReEnteredPassword] = useState<string | undefined | null>();
  const [passwordError, setPasswordError] = useState<string | null | undefined>();
  const[fname, setFname] = useState<string | null>(null)
  const[lname, setLname] = useState<string | null>(null)
  const[mname, setMname] = useState<string | null>(null)
  const[birthday, setBirthday] = useState<any>(null);
  const[birthdayError, setBirthdayError] = useState<any>(null);
  const[sitio, setSitio] = useState<string | null>(null);
  const[barangaySitioError, setbarangaySitioError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(1);
  const[barangay,setBarangay] = useState<string | null>(null);
  const[nameError,setNameError] = useState<string | null>(null);
  const navigation = useNavigation();
  const [username,setUsername] = useState<string | null>('');

  

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

  const [loginError, setLoginError] = useState<string | null>(null);

  //  name

  const handleFnameChange = (text: string) => {
       
    setFname(text)
    const validationError = validateName(text)
    setNameError(validationError)
  }

  const handleLnameChange = (text: string) => {
      setLname(text)
      const validationError = validateName(text)
      setNameError(validationError)

  }

  const handleMnameChange = (text: string) => {
      setMname(text)
      const validationError = validateName(text)
      setNameError(validationError)



  }

  const validateName = (fname: string | null = null, mname: string | null = null, lname: string | null = null) => {
    if (!fname || ! mname || !lname) {
      return "Names cannot be empty.";
    }
    
    return null; // No error

  }

 
  // birthday

  const handleBirthdayChange = (text: string) => {
    let formattedText = text.replace(/[^0-9]/g, '');

    const previousBirthday = birthday || ''; 

    if (formattedText.length < previousBirthday.replace(/[^0-9]/g, '').length) {
        setBirthday(text); 
        return;
    }

    if (formattedText.length <= 2) {
        let month = parseInt(formattedText, 10);
        if (isNaN(month) || month === 0) {
            month = 1; 
        } else if (month > 12) {
            month = 12; 
        }
        formattedText = month.toString().padStart(2, '0');
    } else if (formattedText.length <= 4) {
        let month = formattedText.slice(0, 2);
        let day = parseInt(formattedText.slice(2), 10);
        if (isNaN(day) || day === 0) {
            day = 1; 
        } else if (day > 31) {
            day = 31; 
        }
        formattedText = `${month}/${day.toString().padStart(2, '0')}`;
    } else if (formattedText.length > 4) {
        let month = formattedText.slice(0, 2);
        let day = parseInt(formattedText.slice(2, 4), 10);
        let year = parseInt(formattedText.slice(4, 8), 10);
        if (isNaN(day) || day === 0) {
            day = 1; 
        } else if (day > 31) {
            day = 31; 
        }
        if (isNaN(year) || year === 0) {
            year = 1990; 
        } else if (year > new Date().getFullYear()) {
            year = new Date().getFullYear(); 
        }
        formattedText = `${month}/${day.toString().padStart(2, '0')}/${year}`;
  }

  setBirthday(formattedText);
  console.log(formattedText);
  };

  const validateBirthday = (birthday: string) => {
    if (!birthday) {
      return "Birthday cannot be empty.";
    }
    
    return null; // No error
  }

  // password

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const validationError = validatePassword(text, reEnteredPassword);
    setPasswordError(validationError);
  };

  const handleReEnteredPasswordChange = (text: string) => {
    setReEnteredPassword(text);
    const validationError = validatePassword(password, text);
    setPasswordError(validationError);
  };

  const validatePassword = (password: string | null, reEnteredPassword: string | null = null) => {
    if (!password) {
      return "Password cannot be empty.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    if (!/\d/.test(password)) {
      return "Password must contain at least one number.";
    }

    if (reEnteredPassword !== null && password !== reEnteredPassword) {
      return "Passwords do not match.";
    }

    if(reEnteredPassword == null){
      return "Reenter your password"
    }

    return null; // No error
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

  const validateBarangayAndSitio = (barangay: string | null, sitio: string | null = null) => {
    if (!barangay) {
      return "Barangay must not be empty.";
    }
  
    if (!sitio) {
      return "Sitio must not be empty."; 
    }
  
    return null; 
  };

  const handleNextPress = async () => {
   

    const validationErrorPassword = validatePassword(password, reEnteredPassword);
    const validateErrorName = validateName(fname,mname,lname)
    const validateErrorBirthday = validateBirthday(birthday)
    const validateErrorBarangaySitio = validateBarangayAndSitio(barangay,sitio)

    
    setBirthdayError(validateErrorBirthday)
    setPasswordError(validationErrorPassword);
    setNameError(validateErrorName)
    setbarangaySitioError(validateErrorBarangaySitio)

   
    console.log("Barangay error: ", validateErrorBarangaySitio)



    if (!validateErrorBarangaySitio) {
      navigation.navigate('CitizenPhoto' as never);

      try {
        const userResponse = await axios.post('http://192.168.100.127:3000/user/submit', {
          lname,
          fname,
          mname,
          password,
          birthday
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (fname !== null) {
          await AsyncStorage.setItem('fname', fname ?? 'Rolando');
        }
        if (lname !== null) {
          await AsyncStorage.setItem('lname', lname ?? 'Cleofas');
        }
        if (mname !== null) {
          await AsyncStorage.setItem('mname', mname ?? 'Jacob');
        }

        console.log('User data saved:', userResponse.data);

       
        const barangayResponse = await axios.post('http://192.168.100.127:3000/barangay/submit', {
          barangayname: barangay,
          sitio
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Barangay data saved:', barangayResponse.data);

      
        
        
        navigation.navigate('CitizenPhoto' as never);
      } catch (error: any) {
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
      }

    } else {
      console.log('Validation errors present, not navigating.');
    }
  };

  // username and photo
    
  const validateUsernamePhoto = (username: string | null, photo: any) => {
    if (!username || username.trim() === "") {
      return "Username cannot be empty.";
    }
  
    if (!photo || photo === "" || typeof photo !== 'string') {
      return "Photo cannot be empty or invalid.";
    }
  
    return null; // No error
  };
  

  const handleConfirmUsernamePhoto = async () => {

    const fn = await AsyncStorage.getItem('fname' ?? 'Rolando');
    const ln = await AsyncStorage.getItem('lname' ?? 'Cleofas');
    const mn = await AsyncStorage.getItem('mname' ??  'Jacob');;

    console.log("Username: ", username);
    console.log("Photo URI: ", photoUri3);
  
    const error = validateUsernamePhoto(username, photoUri3);
    
    /*
    if (error) {
      console.log("Error username photo: ", error);
      setUsernamePhotoError(error);
      return;
    }
    */

    try {
      const response = await axios.put(`http://192.168.100.127:3000/user/updateUser/${username}`, {
        fname: fn,
        lname: ln,
        mname: mn
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('User updated successfully');

      navigation.navigate('CitizenLogin' as never);
    } catch (error) {
      handleAxiosError(error);
    }
  
    
  };
  
  // citizen login

  const validateLogin = (username: string | null, password: string | null) => {
    if (!username || username.trim() === "") {
      return "Username cannot be empty.";
    }

    if (!password || password.trim() === "") {
      return "Password cannot be empty.";
    }

    return null; // No error
  };

  const handleUsernameLoginChange = (text: string) => {
    setUsername(text);
  };

  const handlePassordLoginChange = (text: string) => {
    setPassword(text);
  };

  const handleCitizenLogin = async () => {
    try {
      const response = await axios.get('http://192.168.100.127:3000/user/getUser', {
        params: {
          username,
          password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const error = validateLogin(username, password);
  
      if (error) {
        console.log("Error during login validation: ", error);
        setLoginError(error);
        return;
      }
  
      const id = response.data?.id;
  
      if (id) {
        await AsyncStorage.setItem('id', id.toString());
        navigation.navigate('index' as never);
      } else {
        console.error('ID not found in response data');
      }
    } catch (error: any) {
      // If it's a 401 error, handle it gracefully
      if (error.response && error.response.status === 401) {
        setLoginError('Username or password is incorrect');
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
    username,
    setUsername,
    password,
    reEnteredPassword,
    passwordError,
    handlePasswordChange,
    handleReEnteredPasswordChange,
    handleNextPress,
    sitio,
    barangay,
    birthday, 
    birthdayError,
    handleMnameChange, 
    handleLnameChange, 
    handleFnameChange, 
    handleBirthdayChange, 
    handleBarangayChange, 
    handleSitioChange, 
    nameError, 
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

    handlePassordLoginChange,
    handleUsernameLoginChange,
    handleCitizenLogin,
    loginError
  
  };
};

export default useCheckPassword;