import { SafeAreaView, Text, View } from "react-native"
import { FONT_SIZES } from "../../config/constants/font-sizes"


import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { KEYS } from "../../config/constants/async-storage-keys"
import { useLanguage } from "../../hooks/language"
const languages = ["English", "اردو"]

export const SettingsScreen = () => {
    const {language,changeLanguage} =  useLanguage()

    return (
        <SafeAreaView>
            <View>
   
                <View>
                    <Text style={{fontSize:FONT_SIZES.large}}>
                        App Language
                    </Text>

                    <SelectDropdown
                    searchInputStyle={{width:300}}
                    defaultButtonText={language==="en"?"English":"اردو"}
                        data={languages}
                        onSelect={(selectedItem, index) => {
                            const lang=index === 0 ? "en" : "ur"
                            changeLanguage(lang)
                            AsyncStorage.setItem(KEYS.language,lang)
                        }}

                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />

                </View>
            </View>

        </SafeAreaView>
    )
}