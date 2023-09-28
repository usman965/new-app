import React, { useEffect, useState } from "react"
import { Image, Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native"
import { FONT_SIZES } from "../../config/constants/styles";
import { useLanguage } from "../../hooks/language";
import localization from "../../config/locals";
import { useTheme } from "../../hooks/theme";



export const NewsDetailScreen = ({ navigation, route }) => {
    const itemDetail = useState(route.params.item)[0]
    const { language } = useLanguage()
    const { theme } = useTheme()
    const styles = getStyles(theme);

    useEffect(() => {
        navigation.setOptions({
            title: localization[language][route.name],
        })
    }, [language])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>


                <View >
                    <Image source={{ uri: itemDetail?.urlToImage }}
                        resizeMode="center"
                        style={styles.image}
                    />

                    <Text
                        style={styles.dateAuthor}>
                        Author: {itemDetail?.author}
                    </Text>
                    <Text
                        style={styles.dateAuthor}>
                        Date: {new Date(itemDetail?.publishedAt).toDateString()}
                    </Text>
                    <Text
                        style={styles.title}>
                        {itemDetail?.title}
                    </Text>

                    <Text style={styles.description}>
                        {itemDetail?.description}
                    </Text>

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}



const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1, padding: 10,
        backgroundColor:theme.backgroundColor
    },
    image: { height: 200, width: "auto",marginBottom:6 },
    dateAuthor: { color: theme.textColor, fontSize: FONT_SIZES.extraSmall },
    title: { color: theme.textColor, fontSize: FONT_SIZES.extraLarge, fontWeight: "bold",marginVertical:6 },
    description: { color:theme.textColor, fontSize: FONT_SIZES.small ,marginVertical:6},

   
})
