/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import MainNavigation from './src/navigation/main-navigation';
import { Provider } from 'react-redux';
import { store,persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';



function App(): JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>


    {/* <ThemeProvider> e are using redux tool kit for now to handle
     language and theme. if you want to use this just uncomment this
      <LanguageProvider> */}
      <MainNavigation/>
      {/* </LanguageProvider>
    </ThemeProvider> */}
    </PersistGate>

    </Provider>

  );
}

export default App;