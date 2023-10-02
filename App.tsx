/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { PropsWithChildren, createContext } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ThemeProvider } from './src/config/context-provider/theme-provider';
import MainNavigation from './src/navigation/main-navigation';
import { LanguageProvider } from './src/config/context-provider/language-provider';
import { Provider } from 'react-redux';
import { store,persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [selectedLanguage, setselectedLanguage] = useState("en")

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>


    <ThemeProvider>
      <LanguageProvider>
      <MainNavigation/>
      </LanguageProvider>
    </ThemeProvider>
    </PersistGate>

    </Provider>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
