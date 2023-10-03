import React, {  useState } from "react"
import {  Text, View, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from "react-native"
import { FONT_SIZES } from "config/constants/styles";

import { CustomImageView } from "components/shared/custom-image-view";
import { useSelector } from "react-redux";



export const NewsDetailScreen = ({ navigation, route }) => {
    const {theme} = useSelector(state => state.appPrefrences)

    const itemDetail = useState(route.params.item)[0]
    const styles = getStyles(theme);



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View >
                <CustomImageView uri={itemDetail.urlToImage}/>
                 

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
        backgroundColor: theme.backgroundColor
    },
    image: { height: 200, width: "auto", marginBottom: 6 },
    dateAuthor: { color: theme.textColor, fontSize: FONT_SIZES.extraSmall },
    title: { color: theme.textColor, fontSize: FONT_SIZES.extraLarge, fontWeight: "bold", marginVertical: 6 },
    description: { color: theme.textColor, fontSize: FONT_SIZES.small, marginVertical: 6 },


})
