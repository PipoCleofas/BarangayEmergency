import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from "axios";
import useLocation from './useLocation';

export default function useHandleClicks(){
    const {fetchLocation} = useLocation();

    let [uname,setUname] = useState<null | string>(null);
    let [password,setPassword] = useState<null | string>(null);
    const [markerEmoji, setMarkerEmoji] = useState<any>();
    const [markerImageSize, setMarkerImageSize] =useState<{width: any, height: any}> ({ width: 65, height: 70 });

    const navigation = useNavigation();

    const onUnameChange = (text: string) => {
        setUname(text);
    }

    const onPasswordChange = (text: string) => {
        setPassword(text)
    }

    const onLoginPress = () => {
        navigation.navigate('MainPage' as never)
    }

     
    const RouteAssistance = async () => {
        // Fetch the location
        await fetchLocation();
    
        try {
      
          const markerResponse = await axios.post('http://192.168.100.28:3000/marker/submit', {
             
              title: "Emergency Assistance Request",
              description: "Emergency Assistance Request",
          }, {
              headers: {
              'Content-Type': 'application/json',
              },
          });
          console.log('Marker submission success:', markerResponse.data);
        } catch (error: any) {
        handleAxiosError(error);
        }
    
      
    };

    function handleAxiosError (error: any): void  {
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

    return{
        onUnameChange,
        onPasswordChange,
        onLoginPress,
        RouteAssistance,
        markerEmoji,
        markerImageSize,
    }
}