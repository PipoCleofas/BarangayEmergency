import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useHandleClicks from './useHandleClicks';

const usePhotoPicker = () => {

  const { onFileChange, onFileUpload } = useHandleClicks();

  // State to store image URIs and base64 data for each photo
  const [photoUri1, setPhotoUri1] = useState<string | null>(null);
  const [photoBase641, setPhotoBase641] = useState<string | null>(null);

  const [photoUri2, setPhotoUri2] = useState<string | null>(null);
  const [photoBase642, setPhotoBase642] = useState<string | null>(null);

  const [photoUri3, setPhotoUri3] = useState<string | null>(null);
  const [photoBase643, setPhotoBase643] = useState<string | null>(null);

  // Reusable function to select or take a photo and trigger onFileChange
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

    handleUploadPhotos
  };
};

export default usePhotoPicker;