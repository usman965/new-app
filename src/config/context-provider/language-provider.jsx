import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext,  useEffect,  useState } from 'react';
import { KEYS } from '../constants/async-storage-keys';
import { Alert } from 'react-native';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect( ()=>{
    AsyncStorage.getItem(KEYS.language).then(resp=>{
        setLanguage(resp??"en")
    })
  },[])
  const changeLanguage=(language)=>{
    setLanguage(language)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};


