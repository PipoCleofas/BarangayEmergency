import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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
      } catch (error) {
        setErrorMsg("Can't get location");
      } finally {
        setIsFetching(false);
      }
    };

    fetchLocation();
  }, []); // Only fetch location on component mount

  return { location, errorMsg, isFetching };
};

export default useLocation;