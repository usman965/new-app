import React, { memo } from "react"
import { View, Text,  TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ROUTES_NAMES } from "config/constants/navigation"
import { CustomImageView } from "../shared/custom-image-view"
import { useSelector } from "react-redux"


const NewsListItem = memo(({ item }) => {
    const theme = useSelector(state=>state.appPrefrences.theme)


    const navigation = useNavigation()
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(ROUTES_NAMES.newsDetail,
                        { item: item })
                }}
            >
                <Text style={styles.textTitle}>
                    {item.title}
                </Text></TouchableOpacity>

            <CustomImageView uri={item.urlToImage} />

        </View>
    )
})
export default NewsListItem




const getStyles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        flex: 1,
        marginHorizontal: 5,
        marginBottom: 10,
        padding: 10
    },
    textTitle: { color: theme.textColor, fontWeight: "600", marginVertical: 6 },
    image: {
        width: "100%",
        height: 200
    }

})