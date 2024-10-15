import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from "axios";
import useLocation from './useLocation';

export default function useHandleClicks(){
    const {fetchLocation} = useLocation();
    const [loginError, setLoginError] = useState<string | null>(null)
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

    const onLoginPress = async () => {
        try {
          const loginErr = validateLogin(uname, password);
          setLoginError(loginErr);
          console.log(uname, password);
      
          if (loginErr) {
            return;
          }
      
          const response = await axios.get('http://192.168.100.127:3000/serviceprovider/getServiceProvider', {
            params: {
              username: uname,
              password: password,
            },
          });
      
          if (response.data.success) {
            console.log('Login successful');
            navigation.navigate('MainPage' as never);
          } else {
            console.log('Login failed:', response.data.message);
            setLoginError(response.data.message); 
          }
        } catch (err: any) {
          handleAxiosError(err);
        }
      };

     
    const validateLogin = (username: string | null, password: string | null) => {
        if (!username || username.trim() === "") {
          return "Username cannot be empty.";
        }
      
        if (!password || password.trim() === "") {
          return "Password cannot be empty.";
        }
      
        return null; 
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
        markerEmoji,
        markerImageSize,
        loginError,
    }
}