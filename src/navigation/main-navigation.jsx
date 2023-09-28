import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardNavigation from './dashboard-navigation';
import { NewsDetailScreen } from '../screens/dashboard/news-detail';
import { ROUTES_NAMES } from '../config/constants/navigation';
import { useTheme } from '../hooks/theme';
import { Linking, Text } from "react-native"
import { useLanguage } from '../hooks/language';
import localization from '../config/locals';


const Stack = createNativeStackNavigator();


const linking = {
  prefixes: ['newsApp://'],
  config: {
    screens: {
    },
  },
};


const MainNavigation = () => {
  const {language} = useLanguage()


  // useEffect(() => {
  //   const handleDeepLink = async (event) => {
  //     const { path, queryParams, url } = event;
  //   };

  //   Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     Linking.removeEventListener('url', handleDeepLink);
  //   };
  // }, []);


  const { theme } = useTheme()
  return (
    <NavigationContainer linking={linking}>
      
      <Stack.Navigator
        screenOptions={({ route }) => {
          return ({
            headerStyle: {
              backgroundColor: theme.backgroundColor,
            },
            headerTintColor: theme.textColor,
            title:localization[language][route.name],
          })
        }}

      >
        <Stack.Screen name={ROUTES_NAMES.dashboard} component={DashBoardNavigation}
        options={{ headerShown: false }}
        />

        <Stack.Screen
          name={ROUTES_NAMES.newsDetail}
          component={NewsDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
};
export default MainNavigation