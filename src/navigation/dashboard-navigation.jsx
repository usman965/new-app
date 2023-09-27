import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AllNewsScreen } from '../screens/dashboard/all-news';
import { SettingsScreen } from '../screens/dashboard/settings';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';




const Tab = createBottomTabNavigator();

function DashBoardNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarShowLabel:false,
        // headerShown:false
    }}
    >
      <Tab.Screen name="all-news" component={AllNewsScreen} 
      options={{
        tabBarIcon:({color,size})=>(
            <Entypo name="home" size={30}  />
        )
      }}
      
      />
      <Tab.Screen name="settings" component={SettingsScreen} 
        options={{
            tabBarIcon:({color,size})=>(
                <Fontisto name="player-settings" size={30}  />
            )
          }}
      
      />
    </Tab.Navigator>
  );
}
export default DashBoardNavigation