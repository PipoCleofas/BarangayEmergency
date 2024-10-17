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

    // Haversine formula to calculate the distance between two points (in meters)
  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180; // Convert degrees to radians

    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = toRad(lat1); // Latitude 1 in radians
    const φ2 = toRad(lat2); // Latitude 2 in radians
    const Δφ = toRad(lat2 - lat1); // Difference in latitude
    const Δλ = toRad(lon2 - lon1); // Difference in longitude

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
  };

  

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
    fetchLocation, // Return the fetchLocation function to call it manually
    haversineDistance,

  };
};

export default useLocation;