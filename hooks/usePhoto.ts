

import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const usePhotoPicker = () => {
  const [photoUri1, setPhotoUri1] = useState<string | null>(null);
  const [photoBase641, setPhotoBase641] = useState<string | null>(null);

  const [photoUri2, setPhotoUri2] = useState<string | null>(null);
  const [photoBase642, setPhotoBase642] = useState<string | null>(null);

  const [photoUri3, setPhotoUri3] = useState<string | null>(null);
  const [photoBase643, setPhotoBase643] = useState<string | null>(null);

  const handleSelectPhoto1 = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri1(result.assets[0].uri || null);
        setPhotoBase641(result.assets[0].base64 || null);
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
    }
  };

  const handleTakePhoto1 = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        alert('Camera access is required to take photos.');
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri1(result.assets[0].uri || null);
        setPhotoBase641(result.assets[0].base64 || null);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const handleSelectPhoto2 = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri2(result.assets[0].uri || null);
        setPhotoBase642(result.assets[0].base64 || null);
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
    }
  };

  const handleTakePhoto2 = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        alert('Camera access is required to take photos.');
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri2(result.assets[0].uri || null);
        setPhotoBase642(result.assets[0].base64 || null);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const handleSelectPhoto3 = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri3(result.assets[0].uri || null);
        setPhotoBase643(result.assets[0].base64 || null);
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
    }
  };

  const handleTakePhoto3 = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        alert('Camera access is required to take photos.');
        return;
      }

      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri3(result.assets[0].uri || null);
        setPhotoBase643(result.assets[0].base64 || null);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  return {
    photoUri1,
    photoBase641,
    handleSelectPhoto1,
    handleTakePhoto1,

    photoUri2,
    photoBase642,
    handleSelectPhoto2,
    handleTakePhoto2,

    photoUri3,
    photoBase643,
    handleSelectPhoto3,
    handleTakePhoto3,
  };
};

export default usePhotoPicker;