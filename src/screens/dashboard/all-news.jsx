import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"

export const AllNewsScreen=({navigation})=>{
    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("news-detail")
                }}>

                <Text style={{color:"black"}}>
                    This is All News Screen
                </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}