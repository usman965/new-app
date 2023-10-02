import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext,  useEffect,  useState } from 'react';
import { KEYS } from '../constants/async-storage';
import { Alert } from 'react-native';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(null);

  useEffect( ()=>{
    AsyncStorage.getItem(KEYS.language).then(resp=>{
        setLanguage(resp??"en")

    }).catch(err=>{
      setLanguage("en")
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


