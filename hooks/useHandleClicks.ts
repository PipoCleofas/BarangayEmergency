import axios from "axios";
import { useNavigation } from "expo-router";
import useLocation from "./useLocation";
import useSMS from "./useSMS";
import * as SMS from 'expo-sms';
import { useState } from "react";

// request status = 'pending' | 'approved' | 'rejected'
  
const useHandleClicks = () => {
    const {latitude,longitude,setTitle,setDescription, fetchLocation} = useLocation();
    const {isAvailable,setResult} = useSMS();

    // for service request
    const [requestType, setRequestType] = useState<string | undefined>();
    const [requestStatus, setRequestStatus] = useState<string | undefined>();

    const [selectedPhotos, setSelectedPhotos] = useState({
      photo1: null,
      photo2: null,
      photo3: null
    });



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

    const handleLoginButtonCitizenPress = async () => {

      const response = await axios.get('http://192.168.100.127:3000/user/getUser')
        
      

    };

    const handleConfirmUsernamePhoto = () => {
      navigation.navigate('index' as never);
    }
    
    const handleBackButtonInCitizenPhotoPress = () => {
        navigation.navigate("CitizenSignup" as never)
    }

    const handleLoginButtonInSignupAsCitizenPress = () => {
       
        navigation.navigate('CitizenLogin' as never);
    };
    
    const handleEmergencyAssistanceRequestPress = async () => {
        
      setTitle("Emergency Assistance Request");
      setDescription("Emergency Assistance Request");
      
      setRequestType("Emergency Assistance Request")
      setRequestStatus("pending")
      console.log("Request type and request status: " + requestType,requestStatus);
    }

    

    const handleRouteAssistanceRequestPress = async () => {
        setTitle("Route Assistance");
        setDescription("Route Assistance Request");
        
        const requestType = "Emergency Assistance Request";
        const requestStatus = "pending"; 
       
        console.log("Request type and request status: " + requestType,requestStatus);
      }

  


    const EmergencyAssistanceRequest = async (requestType: string) => {
        // Fetch the location
        await fetchLocation();
      
        try {
          // Submit marker data
          const markerResponse = await axios.post('http://192.168.100.127:3000/marker/submit', {
            latitude,
            longitude,
            title: "Emergency Assistance Request",
            description: "Emergency Assistance Request",
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Marker submission success:', markerResponse.data);
      
          // Submit service request data
          const serviceRequestResponse = await axios.post('http://192.168.100.127:3000/servicerequest/submit', {
            requesttype: requestType,  
            requeststatus: "pending",                    
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('Service request success:', serviceRequestResponse.data);
          console.log('Request type set to: ' + requestType);
        } catch (error: any) {
          handleAxiosError(error);
        }
      
        // Send SMS notification
        // sendSMS("Emergency Assistance Request");
      };
      
  
    const RouteAssistance = async () => {
        // Fetch the location
        await fetchLocation();
    
        try {
      
          const markerResponse = await axios.post('http://192.168.100.127:3000/marker/submit', {
              latitude,
              longitude,
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
    
        // Send SMS notification
        //sendSMS("Route Assistance Request");
    };
      
  

    const sendSMS = async (message: string) => {
        if (!isAvailable) {
        console.log("SMS is not available on this device.");
        return;
        }

        try {
        const { result } = await SMS.sendSMSAsync(
            ['09937839142'],
            message
        );
        setResult(result);
        console.log("SMS sent result:", result);
        } catch (error) {
        console.error("Error sending SMS:", error);
        }
    };

    const handleAxiosError = (error: any) => {
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

    const onFileChange = (event: any, photoKey: any) => {
      setSelectedPhotos({
        ...selectedPhotos,  // Keep other files unchanged
        [photoKey]: event.target.files[0]  // Update only the selected file
      });
    };

   
    const uriToBlob = async (uri: string): Promise<Blob> => {
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob;
    };
    
    const onFileUpload = async (fileUri: string, photoKey: string) => {
      
        const formData = new FormData();
    
       
        const blob = await uriToBlob(fileUri);
    
        
        formData.append('image', blob, `${photoKey}.jpg`);
    
        console.log('Uploading file:', photoKey);
    
        
    };
    
    
    
    

    return {
        handleCitizenLoginPress,
        handleCitizenSignUpPress,
        handleProviderLoginPress,
        handleProviderSignUpPress,
        handleBackButtonPress,
        handleLoginButtonPress,
        handleBackButtonInCitizenPhotoPress,
        handleLoginButtonInSignupAsCitizenPress,
        EmergencyAssistanceRequest,
        RouteAssistance,
        handleRouteAssistanceRequestPress,
        handleEmergencyAssistanceRequestPress,

        onFileChange,
        onFileUpload
   
        
    }


}

export default useHandleClicks;