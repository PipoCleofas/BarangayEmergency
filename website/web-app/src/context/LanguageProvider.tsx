import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure of the LanguageContext data
interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
  translations: {
    [key: string]: {
      greeting: string;
      viewRequest: string;
      approval: string;
      home: string;
      settings: string;
    };
  };
}

// Create the context with default value as undefined
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Define the provider component props
interface LanguageProviderProps {
  children: ReactNode;
}

// LanguageProvider component to wrap the app with language context
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Retrieve the initial language from localStorage or default to English
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('language') || 'English';
  });

  // Save the selected language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Function to change the language
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  // Translations object containing strings for different languages
  const translations = {
    English: {
      greeting: 'Hello',
      viewRequest: 'View Request',
      approval: 'Approval',
      home: 'Home',
      settings: 'Settings',
    },
    Filipino: {
      greeting: 'Kamusta',
      viewRequest: 'Tingnan ang Kahilingan',
      approval: 'Pag-apruba',
      home: 'Bahay',
      settings: 'Mga Setting',
    },
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to access LanguageContext
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
