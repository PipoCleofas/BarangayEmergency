// created by RCThree

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const useCheckPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [reEnteredPassword, setReEnteredPassword] = useState<string | undefined | null>();
  const [passwordError, setPasswordError] = useState<string | null | undefined>();
  const[fname, setFname] = useState<string | null>(null)
  const[lname, setLname] = useState<string | null>(null)
  const[mname, setMname] = useState<string | null>(null)
  const[birthday, setBirthday] = useState<any>(null);
  const[birthdayError, setBirthdayError] = useState<any>(null);
  const[sitio, setSitio] = useState<string | null>(null);
  const[barangaySitioError, setbarangaySitioError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const[barangay,setBarangay] = useState<string | null>(null);
  const[nameError,setNameError] = useState<string | null>(null);
  const navigation = useNavigation();

  //  name

  const handleFnameChange = (text: string) => {
       
    setFname(text)
    console.log(fname)

  }

  const handleLnameChange = (text: string) => {
      setLname(text)
      console.log(lname)

  }

  const handleMnameChange = (text: string) => {
      setMname(text)
      console.log(mname)



  }

  const validateName = (fname: string | null, mname: string | null, lname: string | null) => {
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

  // barangay and sitio

  const handleSitioChange = (text: any) => {
    setSitio(text)
    console.log(sitio)
  }

  const handleBarangayChange = (text: any) => {
    setBarangay(text)
    console.log(barangay)
  }

  const validateBarangayAndSitio = (barangay: string | null, sitio: string | null) => {
    if (!sitio && !barangay) {
      return "Barangay and Sitio must not be empty.";
    }
    
    if (!sitio) {
      return "Sitio must not be empty.";
    }

    if (!barangay) {
      return "Barangay must not be empty.";
    }

    
      return null;
    
  };

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

  const handleNextPress = () => {
    //console.log("Current Barangay and Sitio:", barangay, sitio);

    const validationErrorPassword = validatePassword(password, reEnteredPassword);
    const validateErrorName = validateName(fname,mname,lname)
    const validateErrorBirthday = validateBirthday(birthday)
    const validateErrorBarangaySitio = validateBarangayAndSitio(barangay,sitio)

    
    setBirthdayError(validateErrorBirthday)
    setPasswordError(validationErrorPassword);
    setNameError(validateErrorName)
    setbarangaySitioError(validateErrorBarangaySitio)

    console.log('Password Error:', validationErrorPassword);
    console.log("Username error: ", validateErrorName)
    console.log("Birthday error: ", validateErrorBirthday)    
    console.log("Barangay error: ", validateErrorBarangaySitio)



    if (!validationErrorPassword && !validateErrorName && !validateErrorBirthday && !validateErrorBarangaySitio) {
      navigation.navigate('CitizenPhoto' as never);
    } else {
      console.log('Validation errors present, not navigating.');
    }
  };

  return {
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
    barangaySitioError
  };
};

export default useCheckPassword;