import { useNavigation } from "@react-navigation/native"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import { useLanguage } from "../../hooks/language";

export const SplashScreen=({navigation})=>{
    const {language,changeLanguage} =  useLanguage()
    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={()=>{
                    navigation.replace("dashboard")
                    
                    }}>

                <Text style={{color:"black"}}>
                    This is {language}
                </Text>
                <Icon name="rightcircle" size={30} color="#900" />
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}