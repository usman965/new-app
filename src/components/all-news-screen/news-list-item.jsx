import React, { memo } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { ROUTES_NAMES } from "../../config/constants/navigation"
import { useTheme } from "../../hooks/theme"


const NewsListItem = memo(({ item }) => {
    const navigation = useNavigation()
    const { theme } = useTheme()
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
            <Image source={{ uri: item.urlToImage }}
                resizeMode="center" style={styles.image} />

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