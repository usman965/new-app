import React, { useEffect, useState } from "react"
import { FlatList, View, SafeAreaView, TextInput, StyleSheet, RefreshControl, Button } from "react-native"
import NewsListItem from "../../components/all-news-screen/news-list-item";
import { Loader } from "../../components/shared/loader";
import { useTranslation } from "../../hooks/translation";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { getAllNewsAction } from "../../store/actions/get-all-news";


export const AllNewsScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const {theme,language} = useSelector(state => state.appPrefrences)
    const allNewsState=useSelector(state=>state.getAllNews)
    const getTranslatedSentence = useTranslation()
    const [searchString, setSearchString] = useState("")
    const [filteredNews, setFilteredNews] = useState([])
    const styles = getStyles(theme);

    useEffect(()=>{
        if(allNewsState.isSuccess){
            setFilteredNews(allNewsState.data)

        }

    },[allNewsState.isSuccess])

    useEffect(() => {
        if (language) dispatch(getAllNewsAction(language))

    }, [language])


    useEffect(() => {
        const filteredItems = allNewsState.data.filter(item => item.title.toLowerCase().includes(searchString.toLowerCase()))
        setFilteredNews(filteredItems)
    }, [searchString])

    if (allNewsState.isLoading) return <Loader />

    return (
        <SafeAreaView style={styles.container}>
            <View >
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder={getTranslatedSentence("Search By Title")}
                        value={searchString}
                        onChangeText={(value) => {
                            setSearchString(value)
                        }}
                        style={styles.textInput}
                        placeholderTextColor={theme.textColor}
                    />
                    <AntDesign name="search1" size={25} color={theme.textColor} />
                </View>
                <FlatList
                    renderItem={({ item }) => <NewsListItem item={item} />}
                    data={filteredNews}
                    refreshControl={
                        <RefreshControl refreshing={allNewsState.isLoading} onRefresh={()=>{dispatch(getAllNewsAction(language))}} />
                    }
                />
            </View>
        </SafeAreaView>
    )
}


const getStyles = (theme) => StyleSheet.create({
    container: { padding: 10, backgroundColor: theme.backgroundColor, flex: 1 },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: theme.textColor,
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 6,
        justifyContent: "space-between",
        paddingHorizontal: 6,
        backgroundColor: theme.backgroundColor
    },
    textInput: {
        color: theme.textColor,
        minHeight: 50
    }

})


