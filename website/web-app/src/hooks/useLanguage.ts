import { useState } from "react";



export const useLanguage = () => {
    const [language, setLanguage] = useState<string>('en');

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
      };

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
        language, 
        changeLanguage 
      };
}