import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { FONT_SIZES } from "../../config/constants/styles"


import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { KEYS } from "config/constants/async-storage"
import { useTranslation } from "hooks/translation";

import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from "react-redux"
import { changeLanguage, toggleTheme } from "../../store/reducers/app-pref-slice"

const languages = ["English", "عربي"]

export const SettingsScreen = ({ navigation }) => {
    const { theme, language } = useSelector(state => state.appPrefrences)

    const dispatch = useDispatch()
    const getTranslatedSentence = useTranslation()

    const styles = getStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <View>

                <View style={styles.settingSlice}>
                    <Text style={styles.sliceHeading}>
                        {getTranslatedSentence("App Language")}

                    </Text>

                    <SelectDropdown
                        buttonStyle={{ backgroundColor: theme.backgroundColor, textAlign: "right" }}
                        buttonTextStyle={{ color: theme.textColor, textAlign: "right" }}
                        dropdownStyle={{ backgroundColor: theme.backgroundColor }}
                        rowTextStyle={{ color: theme.textColor }}

                        defaultButtonText={language === "en" ? "English" : "عربي"}
                        data={languages}
                        onSelect={(selectedItem, index) => {
                            const lang = index === 0 ? "en" : "ar"
                            dispatch(changeLanguage(lang))

                            // changeLanguage(lang)

                            AsyncStorage.setItem(KEYS.language, lang)
                        }}
                    />
                </View>



                <View style={styles.settingSlice}>
                    <Text style={styles.sliceHeading}>
                        {getTranslatedSentence("Theme")}
                    </Text>

                    <TouchableOpacity onPress={() => {
                        dispatch(toggleTheme())
                    }}>
                        <Feather name="sun" size={25} color={theme.isLight ? "black" : "orange"} />
                    </TouchableOpacity>

                </View>


                <View>


                    <Text
                        accessible={true}
                        accessibilityLabel="Hello World"
                        accessibilityHint="This is a greeting message"
                        accessibilityRole="header"
                        accessibilityState={{ selected: true }}>

                        Hello World

                    </Text>
                </View>











            </View>


        </SafeAreaView >
    )
}




const getStyles = (theme) => StyleSheet.create({
    container: { padding: 10, flex: 1, backgroundColor: theme.backgroundColor },
    settingSlice: { justifyContent: "space-between", flexDirection: "row", alignItems: "center", marginBottom: 20 },
    sliceHeading: {
        fontSize: FONT_SIZES.large,
        color: theme.textColor

    }


})