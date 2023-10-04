import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AllNewsScreen } from 'screens/dashboard/all-news';
import { SettingsScreen } from 'screens/dashboard/settings';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ROUTES_NAMES } from 'config/constants/navigation';
import { useTranslation } from "hooks/translation"
import { useSelector } from 'react-redux';



const Tab = createBottomTabNavigator();

function DashBoardNavigation() {
  const theme = useSelector(state => state.appPrefrences.theme)

  const getTranslatedSentence = useTranslation()

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => {
        return ({
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.textColor,
          title: getTranslatedSentence(route.name),
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: theme.backgroundColor },
          tabBarIcon: ({ color, size }) => {
            if (route.name === ROUTES_NAMES.allNews) {
              return <Entypo name="home" size={30} color={navigation.isFocused() ? "dodgerblue" : theme.textColor} />
            }
            else if (route.name === ROUTES_NAMES.settings) {
              return <Fontisto name="player-settings" size={30} color={navigation.isFocused() ? "dodgerblue" : theme.textColor} />
            }
          }
        })
      }}
    >
      <Tab.Screen name={ROUTES_NAMES.allNews} component={AllNewsScreen} />
      <Tab.Screen name={ROUTES_NAMES.settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
}
export default DashBoardNavigation