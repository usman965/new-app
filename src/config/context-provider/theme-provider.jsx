import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext,  useState , useEffect} from 'react';
import { KEYS } from '../constants/async-storage';
import { Alert } from 'react-native';


export const lightTheme = {
  isLight:true,
    backgroundColor: '#ffffff',
    textColor: '#333333',
  };
  
  export const darkTheme = {
    isLight:false,
    backgroundColor: 'gray',
    textColor: '#ffffff',
  };


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);


  useEffect( ()=>{
    AsyncStorage.getItem(KEYS.isLightTheme).then(resp=>{
      setTheme(resp?lightTheme:darkTheme)
    })
  },[])



  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
    AsyncStorage.setItem(KEYS.isLightTheme, (theme === lightTheme).toString())
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


