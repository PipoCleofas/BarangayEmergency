import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);


  const fetchLocation = async () => {
    setIsFetching(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setIsFetching(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setTitle("Emergency Assistance Request");
      setDescription("Emergency Assistance Request");

    } catch (error) {
      setErrorMsg("Can't get location");
    } finally {
      setIsFetching(false);
    }
  };

  
  useEffect(() => {
    fetchLocation();
  }, []); 

  // directions

  

  return { 
    location, 
    errorMsg, 
    isFetching, 
    latitude, 
    longitude, 
    title, 
    description, 
    setLatitude, 
    setLongitude, 
    setTitle, 
    setDescription, 
    fetchLocation // Return the fetchLocation function to call it manually
  };
};

export default useLocation;