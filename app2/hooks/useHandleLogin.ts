import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from "axios";
import useLocation from './useLocation';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function useHandleClicks(){
    const {fetchLocation} = useLocation();
    const [loginError, setLoginError] = useState<string | null>(null)
    let [uname,setUname] = useState<null | string>(null);
    let [password,setPassword] = useState<null | string>(null);
    const [markerEmoji, setMarkerEmoji] = useState<any>();
    const [markerUnameEmoji, setMarkerUnameEmoji] = useState<any>();

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
              console.log(loginErr);
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

              await AsyncStorage.setItem('username', uname as string);
              console.log('Username stored in AsyncStorage:', uname);

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
      
   async function imageChanger(){
    const uname = await AsyncStorage.getItem('username')
    if(uname === 'BFP'){
        setMarkerUnameEmoji(changeMarkerImage('BFP'))
    }else if(uname === 'PNP'){
        setMarkerUnameEmoji(changeMarkerImage('PNP'))
    }else if(uname === 'Medical'){
        setMarkerUnameEmoji(changeMarkerImage('Medical'))
    }else if(uname === 'NDRRMC'){
        setMarkerUnameEmoji(changeMarkerImage('NDRRMC'))
    }
   }

    function changeMarkerImage(uname: string){
        switch (uname) {
            case 'BFP':
              return require('../assets/images/fire.png');
            case 'PNP':
              return require('../assets/images/police.webp');
            case 'Medical':
              return require('../assets/images/medic.png');
            case 'NDRRMC':
              return require('../assets/images/ndrrmc.png');
          }
    }

    
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
        markerUnameEmoji,
        imageChanger,
    }
}