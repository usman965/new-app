import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { FONT_SIZES } from "../../config/constants/styles"


import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { KEYS } from "../../config/constants/async-storage"
import { useLanguage } from "../../hooks/language"
import localization from "../../config/locals"
import { useRoute } from "@react-navigation/native"
import { useEffect } from "react"

import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from "../../hooks/theme"

const languages = ["English", "عربي"]

export const SettingsScreen = ({ navigation }) => {
    const { language, changeLanguage } = useLanguage()
    const route = useRoute()
    const { theme, toggleTheme } = useTheme()

    const styles = getStyles(theme);

    useEffect(() => {
        navigation.setOptions({
            title: localization[language][route.name],
        })
    }, [language])



    return (
        <SafeAreaView style={styles.container}>
            <View>

                <View style={styles.settingSlice}>
                    <Text style={styles.sliceHeading}>
                        {localization[language]["App Language"]}

                    </Text>

                    <SelectDropdown
                        buttonStyle={{ backgroundColor: theme.backgroundColor,textAlign:"right" }}
                        buttonTextStyle={{ color: theme.textColor,textAlign:"right" }}
                        dropdownStyle={{ backgroundColor: theme.backgroundColor }}
                        rowTextStyle={{ color: theme.textColor }}

                        defaultButtonText={language === "en" ? "English" : "عربي"}
                        data={languages}
                        onSelect={(selectedItem, index) => {
                            const lang = index === 0 ? "en" : "ar"
                            changeLanguage(lang)
                            AsyncStorage.setItem(KEYS.language, lang)
                        }}
                    />
                </View>



                <View style={styles.settingSlice}>
                    <Text style={styles.sliceHeading}>
                        {localization[language]["Theme"]}
                    </Text>

                    <TouchableOpacity onPress={() => {
                        toggleTheme()
                    }}>
                        <Feather name="sun" size={25} color={theme.isLight ?   "black":"orange"} />
                    </TouchableOpacity>

                </View>

            </View>

        </SafeAreaView>
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