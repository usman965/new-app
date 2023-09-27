import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/splash/splash';
import DashBoardNavigation from './dashboard-navigation';
import { NewsDetailScreen } from '../screens/dashboard/news-detail';
import { ScreenHeader } from '../components/shared/ScreenHeader';
import { SafeAreaView } from 'react-native';


const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown:false
        }}
        />
        <Stack.Screen name="dashboard" component={DashBoardNavigation} 
        options={{headerShown:false}}
        />

        <Stack.Screen 
        name='news-detail'
         component={NewsDetailScreen}

        options={{
            title:"advadvdv",
            headerTitle:()=><ScreenHeader title="adff"/>

        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation