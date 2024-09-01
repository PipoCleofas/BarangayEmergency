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

  const handleSendSMS = async () => {
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
  };

  return {
    isAvailable,
    result,
    handleSendSMS,
  };
};

export default useSMS;