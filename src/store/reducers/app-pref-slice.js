import { createSlice } from "@reduxjs/toolkit";


const lightTheme = {
  isLight: true,
  backgroundColor: '#ffffff',
  textColor: '#333333',
};

const darkTheme = {
  isLight: false,
  backgroundColor: 'gray',
  textColor: '#ffffff',
};



const initialState = {
  language: "en",
  theme: lightTheme,
};


//State slice
const appPrefrences = createSlice({
  name: "prefrences",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleTheme: (state, action) => {
      state.theme = JSON.stringify(state.theme) === JSON.stringify(lightTheme) ? darkTheme : lightTheme
    }
  },
});

// Action creators are automatically generated for each case reducer function 
export const { changeLanguage, toggleTheme } = appPrefrences.actions;

export default appPrefrences.reducer;