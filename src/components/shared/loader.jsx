import { Text, View, ActivityIndicator } from "react-native"
import { FONT_SIZES } from "../../config/constants/styles"

export const Loader = () => {
    return (
        <View style={{
            width: "100%", height: "100%", justifyContent: "center",
            alignItems: "center", backgroundColor: "#00000022"
        }}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={{ color: "black",fontSize:FONT_SIZES.small }}>
                Loading...
            </Text>
        </View>
    )
}