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
  const [arrivalTime, setArrivalTime] = useState<number | null | string>()

  const handleArrivalTime = (distance: any, setter: any) => {
   switch (distance){
    case 14000:
    
      setArrivalTime(20)
      console.log('14 km')
      break;
    case 13000:
   
      setArrivalTime(18)
      console.log('13 km')
      break;
    case 12000:
     
      setArrivalTime(16)
      console.log('12 km')
      break;
    case 10000:
     
      setArrivalTime(14)
      console.log('10 km')
      break;
    case 8000:
   
      setArrivalTime(12)
      console.log('8 km')
      break;
    case 5000:
      
      setArrivalTime(8)
      console.log('5 km')
      break;
    case 3000:
    
      setArrivalTime(5)
      console.log('3 km')
      break;
    case 1000:

      setArrivalTime(2)
      console.log('1 km')
      break;
    default:

      setArrivalTime('Calculating')
      console.log('Calculating')
      break;
   }


  }

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
    fetchLocation, 
    handleArrivalTime,
    arrivalTime,

  };
};

export default useLocation;