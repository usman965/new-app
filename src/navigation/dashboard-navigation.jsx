import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AllNewsScreen } from '../screens/dashboard/all-news';
import { SettingsScreen } from '../screens/dashboard/settings';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ROUTES_NAMES } from '../config/constants/navigation';
import { useTheme } from '../hooks/theme';
import localization from '../config/locals';
import { useLanguage } from '../hooks/language';


const Tab = createBottomTabNavigator();

function DashBoardNavigation() {

  const {theme} = useTheme()
  const { language } = useLanguage()

  return (
    <Tab.Navigator
    screenOptions={({ route }) => {
      return ({
        headerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerTintColor: theme.textColor,
        // tabBarShowLabel:false,
        title:localization[language][route.name],
        tabBarStyle:{backgroundColor:theme.backgroundColor},
      })
    }}
    >
      <Tab.Screen name={ROUTES_NAMES.allNews} component={AllNewsScreen} 
      options={{
        tabBarIcon:({color,size})=>(
            <Entypo name="home" size={30} color={theme.textColor} />
        )
      }}
      
      />
      <Tab.Screen name={ROUTES_NAMES.settings} component={SettingsScreen} 
        options={{
            tabBarIcon:({color,size})=>(
                <Fontisto name="player-settings" size={30}  color={theme.textColor}/>
            )
          }}
      
      />
    </Tab.Navigator>
  );
}
export default DashBoardNavigation