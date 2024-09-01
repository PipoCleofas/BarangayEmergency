// created by RCThree

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const useCheckPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [reEnteredPassword, setReEnteredPassword] = useState<string | undefined | null>();
  const [passwordError, setPasswordError] = useState<string | null | undefined>();
  const navigation = useNavigation();


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

  const handleLoginPress = () => {
    const validationError = validatePassword(password);
    if (!validationError) {
      navigation.navigate('(tabs)' as never);
    }
  };

  const handleNextPress = () => {
    const validationErrorPassword = validatePassword(password, reEnteredPassword);
    //const validationErrorUsername = validateUsername(username);

    setPasswordError(validationErrorPassword);
    //setUsernameError(validationErrorUsername);

    console.log('Password Error:', validationErrorPassword);
    //console.log('Username Error:', validationErrorUsername);

    if (!validationErrorPassword) {
      console.log('Navigating to LoginScreen');
      navigation.navigate('CitizenPhoto' as never);
    } else {
      console.log('Validation errors present, not navigating.');
    }
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

    return null; // No error
  };

  return {
    password,
    reEnteredPassword,
    passwordError,
    handlePasswordChange,
    handleReEnteredPasswordChange,
    handleLoginPress,
    handleNextPress,
  };
};

export default useCheckPassword;