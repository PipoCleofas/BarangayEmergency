import { useState, useEffect } from 'react';
import * as SMS from 'expo-sms';



const useSMS = () => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [result, setResult] = useState<any>(null);


  useEffect(() => {
    const checkSMSAvailability = async () => {
      try {
        const available = await SMS.isAvailableAsync();
        setIsAvailable(available);
      } catch (error) {
        console.error("Error checking SMS availability:", error);
        setIsAvailable(false);
      }
    };

    checkSMSAvailability();
  }, []);



  return {
    isAvailable,
    result,
    setResult,
  };
};

export default useSMS;