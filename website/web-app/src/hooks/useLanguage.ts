import { useState } from "react";



export const useLanguage = () => {
    const [language, setLanguage] = useState<string>('English');

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
      };

    const data = [
      {
          label: 'English',
          value: 'English'
      },
      {
          label: 'Filipino',
          value: 'Filipino'
      },
      ];

      const translations = {
        en: {
          greeting: "Hello",
          description: "Welcome to our website!",
        },
        fil: {
          greeting: "Hello",
          description: "Maligayang pagdating sa aming website",
        }
      };

      return { 
        data,
        language, 
        changeLanguage,
        
      };
}