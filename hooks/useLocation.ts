import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

 
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [title, setTitle] = useState<string | null>(null); 
  const [description, setDescription] = useState<string | null>(null); 



  useEffect(() => {
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

        setTitle("Your Location");
        setDescription(`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);

        
  
      } catch (error) {
        setErrorMsg("Can't get location");
      } finally {
        setIsFetching(false);
      }
    };

    fetchLocation();
  }, []); // Only fetch location on component mount

  return { location, errorMsg, isFetching, latitude, longitude, title, description, setLatitude, setLongitude, setTitle, setDescription };
};

export default useLocation;