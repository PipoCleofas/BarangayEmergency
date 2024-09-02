import { useNavigation } from "expo-router";

const useHandleClicks = () => {
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

    const handleLoginButtonInSignupAsCitizenPress = () => {
        /*console.log({ fname, lname, mname, birthday });
    
        if (!fname || !lname || !mname || !birthday) {
            handleSignupErrorChange('Please fill out all the required fields.');
            console.log(signupError);
            return; 
        }
        
        handleSignupErrorChange(null); 
        console.log('no error');*/
        navigation.navigate('CitizenLogin' as never);
    };
    

    return {
        handleCitizenLoginPress,
        handleCitizenSignUpPress,
        handleProviderLoginPress,
        handleProviderSignUpPress,
        handleBackButtonPress,
        handleLoginButtonPress,
        handleLoginButtonInSignupAsCitizenPress,
    }
}

export default useHandleClicks;