import axios from "axios";
import { useNavigation } from "expo-router";
import useLocation from "./useLocation";
import useSMS from "./useSMS";
import * as SMS from 'expo-sms';

const useHandleClicks = () => {
    const {latitude,longitude,title,description, setLatitude,setLongitude,setTitle,setDescription} = useLocation();

    const {isAvailable,setResult} = useSMS();

    const navigation = useNavigation();

    const handleCitizenLoginPress = () => {
        navigation.navigate('CitizenLogin' as never);
    }

    const handleCitizenSignUpPress = () => {
        navigation.navigate('CitizenSignup' as never);
    }

    const handleProviderLoginPress = () => {
        navigation.navigate('ProviderLogin' as never);
    }

    const handleProviderSignUpPress = () => {
        navigation.navigate('ProviderSignup' as never);
    }

    const handleBackButtonPress = () => {
        navigation.navigate('Signup' as never);
    }

    const handleLoginButtonPress = () => {
        navigation.navigate('(tabs)' as never);
    }

    const handleBackButtonInCitizenPhotoPress = () => {
        navigation.navigate("CitizenSignup" as never)
    }

    const handleLoginButtonInSignupAsCitizenPress = () => {
       
        navigation.navigate('CitizenLogin' as never);
    };
    
    const EmergencyAssistanceRequest = async () => {


        if (!isAvailable) {
            console.log("SMS is not available on this device.");
            return;
          }
      
          try {
            const { result } = await SMS.sendSMSAsync(
              // add number here
              ['09937839142', ],
      
              // message
              'Emergency Assistance Request',
              {
                attachments: {
                  uri: 'path/myfile.png',
                  mimeType: 'image/png',
                  filename: 'myfile.png',
                },
              }
            );
      
            setResult(result); 
            console.log("SMS sent result:", result);
          } catch (error) {
            console.error("Error sending SMS:", error);
          }

        try {
            const response = await axios.post('http://192.168.100.28:3000/marker/submit', {
              latitude,
              longitude,
              title,
              description,
            }, {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            console.log('Success:', response.data);
            setLatitude(null);
            setLongitude(null);
            setTitle(null);
            setDescription(null);
          } catch (error: any) {
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
          }
    }

    return {
        handleCitizenLoginPress,
        handleCitizenSignUpPress,
        handleProviderLoginPress,
        handleProviderSignUpPress,
        handleBackButtonPress,
        handleLoginButtonPress,
        handleBackButtonInCitizenPhotoPress,
        handleLoginButtonInSignupAsCitizenPress,
        EmergencyAssistanceRequest
    }
}

export default useHandleClicks;