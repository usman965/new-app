import React, { useEffect, useState } from "react"
import { FlatList, View, SafeAreaView,  TextInput, StyleSheet, RefreshControl,Linking } from "react-native"
import NewsListItem from "../../components/all-news-screen/news-list-item";
import httpRequest from "../../config/networking/axios-instance";
import { Loader } from "../../components/shared/loader";
import { useRoute } from '@react-navigation/native';
import { useLanguage } from "../../hooks/language";
import localization from "../../config/locals";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from "../../hooks/theme";
import { NEWS_APP_KEY } from "../../config/constants/secrets";


export const AllNewsScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false)
    const [allNews, setAllNews] = useState([])
    const [searchString, setSearchString] = useState("")
    const [filteredNews, setFilteredNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {theme} = useTheme()
    const { language } = useLanguage()
    const styles = getStyles(theme);


    const getAllNews=()=>{
        setRefreshing(true)
        httpRequest.get(`/top-headlines?language=${language}&apiKey=${NEWS_APP_KEY}`)
        .then(resp => {
            setRefreshing(false)
            setAllNews(resp?.articles)
            setFilteredNews(resp?.articles)
            setIsLoading(false)
        })
        .catch(error => {
            setRefreshing(false)
            setIsLoading(false)
            console.error('Error fetching data:', error);
        });
    }
    useEffect(() => {
        getAllNews()

    }, [language])


    useEffect(() => {
        const filteredItems = allNews.filter(item => item.title.toLowerCase().includes(searchString.toLowerCase()))
        setFilteredNews(filteredItems)
    }, [searchString])


    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading && <Loader />
            }
            <View >
         
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder=  {localization[language]["Search By Title"]}
                        value={searchString}
                        onChangeText={(value) => {
                            setSearchString(value)
                        }}
                        style={styles.textInput}
                        placeholderTextColor={theme.textColor}
                        />
                    <AntDesign name="search1" size={25} color={theme.textColor}/>
                </View>
                <FlatList
                    renderItem={({ item }) => <NewsListItem item={item} />}
                    data={filteredNews}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={getAllNews} />
                    }
                />
            </View>
        </SafeAreaView>
    )
}


const getStyles = (theme) =>   StyleSheet.create({
    container:{padding:10,backgroundColor:theme.backgroundColor},
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: theme.textColor,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 6,
        justifyContent: "space-between",
        paddingHorizontal: 6,
        backgroundColor:theme.backgroundColor
    },
    textInput:{
        color:theme.textColor,
        minHeight:50
    }

})


