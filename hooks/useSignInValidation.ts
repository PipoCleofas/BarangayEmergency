import { useState } from "react";




const useSignInValidation = () => {

    const [signInError, setSignInError] = useState<string | null>(null);

    
    

    return{
        signInError,
        setSignInError
    }
}