import React, { createContext,  useState } from 'react';


export const lightTheme = {
    backgroundColor: '#ffffff',
    textColor: '#333333',
  };
  
  export const darkTheme = {
    backgroundColor: '#121212',
    textColor: '#ffffff',
  };


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


