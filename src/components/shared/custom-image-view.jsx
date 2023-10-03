import { ActivityIndicator, Image, Text, View,StyleSheet } from "react-native"
import { memo, useState } from "react"
import { FONT_SIZES } from "config/constants/styles";
import { useSelector } from "react-redux";

export const CustomImageView =memo ( ({ uri = null }) => {
    const theme = useSelector(state=>state.appPrefrences.theme)
    const styles = getStyles(theme);

    const checkImageAvailablity = (url) => {
        if (url) {
            return { uri: url }
        }
        else {
            return require("../../../assets/images/no-image.jpeg")
        }
    }

    const [isImageLoading, setIsImageLoading] =  useState(false)
    const [errorInImageLoading, setErrorInImageLoading] = useState(false)
    return (
        <View>
            {isImageLoading && !errorInImageLoading && <ActivityIndicator size="large" />}
            {errorInImageLoading ? (
                <Text 
                style={styles.errorText} 
                >Error loading image</Text>) : (
                <Image source={checkImageAvailablity(uri)}
                    resizeMode="contain"
                    style={styles.image}
                    onLoadStart={() => { setIsImageLoading(true) }}
                    onLoadEnd={() => { setIsImageLoading(false) }}
                    onError={() => { setErrorInImageLoading(true) }}
                />
            )}
        </View>
    )
})


const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1, padding: 10,
        backgroundColor: theme.backgroundColor
    },
    image: { height: 200, width: "auto", marginBottom: 6 },
    errorText: { color: theme.textColor, fontSize: FONT_SIZES.large },
    


})