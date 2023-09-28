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


const API_DATA= [
      {
        "source": {
          "id": "reuters",
          "name": "Reuters"
        },
        "author": "Jonathan Stempel, Karen Freifeld",
        "title": "Donald Trump found liable for fraud in New York civil case - Reuters",
        "description": "A New York judge found Donald Trump and his family business fraudulently inflated the value of his properties and other assets, in a major defeat for the former U.S. president that could severely hamper his ability to do business in the state.",
        "url": "https://www.reuters.com/legal/judge-finds-trump-liable-fraud-new-york-civil-case-2023-09-26/",
        "urlToImage": "https://www.reuters.com/resizer/uygZbZW2km_8IbWQyOGZeySly80=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/KPEG4ZGEK5M55EDSZPJL5RDSBY.jpg",
        "publishedAt": "2023-09-27T06:17:00Z",
        "content": "NEW YORK, Sept 26 (Reuters) - A New York judge found Donald Trump and his family business fraudulently inflated the value of his properties and other assets, in a major defeat for the former U.S. pre\u2026 [+5867 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "Hollywood Reporter"
        },
        "author": "Katie Kilkenny",
        "title": "Writers Guild Strike to End Wednesday: Leadership Votes to Conclude Historic Work Stoppage - Hollywood Reporter",
        "description": "At 148 days, the 2023 strike was the second longest in the union's history, behind only a labor action in 1988.",
        "url": "https://www.hollywoodreporter.com/business/business-news/writers-guild-strike-end-1235600992/",
        "urlToImage": "https://www.hollywoodreporter.com/wp-content/uploads/2023/04/2023_03-WGA-03.jpg?w=1024",
        "publishedAt": "2023-09-27T05:37:30Z",
        "content": "A historic Hollywood labor battle will soon be over.\r\nThe 148-day writers\u2019 strike, the second longest in Writers Guild of America history, will conclude on 12:01 am PT Wednesday thanks to a vote from\u2026 [+3446 chars]"
      },
      {
        "source": {
          "id": "al-jazeera-english",
          "name": "Al Jazeera English"
        },
        "author": "Al Jazeera",
        "title": "Asteroid \u2018dust, debris\u2019 likely found as returned NASA space capsule opened - Al Jazeera English",
        "description": "Dark powder, sand-sized particles found as lid opened on Osiris-REx space probe which collected samples from asteroid.",
        "url": "https://www.aljazeera.com/news/2023/9/27/asteroid-dust-debris-likely-found-as-returned-nasa-space-capsule-opened",
        "urlToImage": "https://www.aljazeera.com/wp-content/uploads/2023/09/afp.com-20230924-PH-GTY-1687008696-highres-1695787252.jpg?resize=1920%2C1440",
        "publishedAt": "2023-09-27T04:19:12Z",
        "content": "Scientists at the United States space agency NASA found black dust and debris when they opened the space capsule that recently returned to Earth with the largest asteroid sample ever brought back fro\u2026 [+3431 chars]"
      },
      {
        "source": {
          "id": "usa-today",
          "name": "USA Today"
        },
        "author": "Emily DeLetter",
        "title": "Google's 25th birthday: Surprise Doodle and Easter eggs to look for - USA TODAY",
        "description": "Some of Google's products, including search, hum to search and translate will have special Easter eggs marking its birthday.",
        "url": "https://www.usatoday.com/story/news/2023/09/27/google-doodle-birthday-surprise-translate/70960063007/",
        "urlToImage": "https://www.usatoday.com/gcdn/authoring/authoring-images/2023/09/25/USAT/70960632007-g-25-gle-logo-static-1920-x-1080-1.png?crop=1919,1079,x0,y0&width=1919&height=1079&format=pjpg&auto=webp",
        "publishedAt": "2023-09-27T04:03:45Z",
        "content": "It's Google's 25th birthday, and the company is pulling out all the stops.\r\nFirst incorporated in 1998, Google turns a quarter of a century on Wednesday, and some of its products including search, hu\u2026 [+1466 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "MLB.com"
        },
        "author": "Jake Rill",
        "title": "Brooks Robinson dies at 86 - MLB.com",
        "description": "Brooks Robinson, the legendary third baseman and Hall of Famer affectionately known as \"Mr. Oriole\" for spending his entire 23-year big league career in Baltimore, has died at 86.\n\"All of us at Major League Baseball are saddened by the loss of Brooks Robinson\u2026",
        "url": "https://www.mlb.com/news/brooks-robinson-dies-at-86",
        "urlToImage": "https://img.mlbstatic.com/mlb-images/image/upload/t_2x1/t_w1536/mlb/ydyirwzdulswtdq1e8rn.jpg",
        "publishedAt": "2023-09-27T04:03:22Z",
        "content": "Brooks Robinson, the legendary third baseman and Hall of Famer affectionately known as \"Mr. Oriole\" for spending his entire 23-year big league career in Baltimore, has died at 86.\r\n\"All of us at Majo\u2026 [+7069 chars]"
      },
      {
        "source": {
          "id": "reuters",
          "name": "Reuters"
        },
        "author": "Reuters",
        "title": "Pressure piles on China Evergrande with report chairman under police surveillance - Reuters",
        "description": "The chairman of China Evergrande Group \u003Ca href=\"https://www.reuters.com/markets/companies/3333.HK\" target=\"_blank\"\u003E(3333.HK)\u003C/a\u003E has been placed under police surveillance, Bloomberg News reported on Wednesday, ratcheting up pressure on the embattled developer\u2026",
        "url": "https://www.reuters.com/markets/asia/evergrande-shares-set-open-down-38-amid-uncertainty-over-debt-revamp-plan-2023-09-27/",
        "urlToImage": "https://www.reuters.com/resizer/dte4gNU-SaMKpvOMFQbCZ0H1PJM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/4TOLKN5SMJJMTL4NYCBAPZ63XE.jpg",
        "publishedAt": "2023-09-27T04:02:27Z",
        "content": "HONG KONG, Sept 27 (Reuters) - The chairman of China Evergrande Group (3333.HK) has been placed under police surveillance, Bloomberg News reported on Wednesday, ratcheting up pressure on the embattle\u2026 [+1763 chars]"
      },
      {
        "source": {
          "id": "entertainment-weekly",
          "name": "Entertainment Weekly"
        },
        "author": "Calie Schepp",
        "title": "'Dancing With the Stars' season 32 premiere elimination revealed - Entertainment Weekly News",
        "description": "\u003Cem\u003EDWTS\u003C/em\u003E welcomed a new cohost, a new trophy name, and a move back to ABC.",
        "url": "https://ew.com/tv/recaps/dancing-with-the-stars-season-32-premiere-recap/",
        "urlToImage": "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C196%2C1500%2C946&poi=face&w=1500&h=750&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2023%2F09%2F27%2Fcharity-lawson-DWTS-092623.jpg",
        "publishedAt": "2023-09-27T03:57:00Z",
        "content": "We're back (on ABC) baby!\r\nSeason 32 of Dancing With the Stars kicked off on Tuesday with an out-of-this-world intro, literally. The pro dancers joined returning host Alfonso Ribeiro and his new coho\u2026 [+3631 chars]"
      },
      {
        "source": {
          "id": "cbs-news",
          "name": "CBS News"
        },
        "author": "Faris Tanyos",
        "title": "Wael Hana, co-defendant in Robert Menendez case, arrested at JFK - CBS News",
        "description": "He is one of three businessmen federally charged with coordinating hundreds of thousands of dollars in bribes to Democratic Sen. Robert Menendez of New Jersey and his wife.",
        "url": "https://www.cbsnews.com/news/robert-menendez-wael-hana-co-defendant-bribery-case-arrested-jfk-new-york-egypt/",
        "urlToImage": "https://assets1.cbsnewsstatic.com/hub/i/r/2023/09/27/955b468b-b353-4086-988a-766ea5ddfd3f/thumbnail/1200x630/64bb1d0a45694b6e6a2b95a2e89bfdd4/gettyimages-1690041865.jpg?v=cc1d20369924eaddf626a3a17b75fcb0",
        "publishedAt": "2023-09-27T03:56:00Z",
        "content": "One of three businessmen federally charged with coordinating hundreds of thousands of dollars in bribes to Democratic Sen. Robert Menendez of New Jersey and his wife was arrested Tuesday after flying\u2026 [+2795 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "[Removed]"
        },
        "author": null,
        "title": "[Removed]",
        "description": "[Removed]",
        "url": "https://removed.com",
        "urlToImage": null,
        "publishedAt": "1970-01-01T00:00:00Z",
        "content": "[Removed]"
      },
      {
        "source": {
          "id": "espn",
          "name": "ESPN"
        },
        "author": null,
        "title": "Brewers clinch NL Central after Cubs blow big lead to Braves - ESPN - ESPN",
        "description": "Milwaukee got a helping hand from the Chicago Cubs, who blew a 6-0 lead to lose to the Braves on Tuesday night to clinch the NL Central for the Brewers.",
        "url": "https://www.espn.com/mlb/story/_/id/38500608/milwaukee-brewers-clinch-nl-central-3rd-6-years",
        "urlToImage": "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F0927%2Fr1230353_1024x576_16%2D9.jpg",
        "publishedAt": "2023-09-27T02:30:00Z",
        "content": "Sep 26, 2023, 10:30 PM ET\r\nMILWAUKEE -- The Brewers clinched the NL Central title for the third time in six seasons Tuesday night despite a 4-1 loss to the last-place St. Louis Cardinals and with the\u2026 [+2714 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "YouTube"
        },
        "author": null,
        "title": "Target closing East Harlem store, blaming theft - FOX 5 New York",
        "description": "Target has announced that it will close nine of its stores nationwide, including one on 117th Street in East Harlem on October 21, citing rampant shoplifting...",
        "url": "https://www.youtube.com/watch?v=ffdAT0SoLrE",
        "urlToImage": "https://i.ytimg.com/vi/ffdAT0SoLrE/hqdefault.jpg",
        "publishedAt": "2023-09-27T02:25:26Z",
        "content": null
      },
      {
        "source": {
          "id": null,
          "name": "BBC News"
        },
        "author": "https://www.facebook.com/bbcnews",
        "title": "Iraq fire: At least 100 killed in blaze at wedding party in Nineveh - BBC",
        "description": "The bride and the groom are thought to be among the victims of the blaze, local media reports.",
        "url": "https://www.bbc.com/news/world-middle-east-66932327",
        "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/428C/production/_131263071_gettyimages-1691117532.jpg",
        "publishedAt": "2023-09-27T01:38:07Z",
        "content": "At least 100 people have died and 150 others injured after a fire broke out at a wedding in northern Iraq, state media has reported. \r\nThe bride and the groom are reported to be among the victims, ac\u2026 [+2164 chars]"
      },
      {
        "source": {
          "id": "fox-news",
          "name": "Fox News"
        },
        "author": "Adam Sabes",
        "title": "Who is Jason Billingsley, accused of killing Baltimore tech CEO Pava Marie LaPere? - Fox News",
        "description": "Baltimore police accused Jason Dean Billingsley, 32, of killing Pava Marie LaPere, who was a tech CEO and was named a Forbes 30 Under 30 recipient.",
        "url": "https://www.foxnews.com/us/jason-billingsley-accused-killing-baltimore-tech-ceo-pava-marie-lapere",
        "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2023/09/Untitled-design-1090.png",
        "publishedAt": "2023-09-27T01:17:00Z",
        "content": "Baltimore police allege that 32-year-old Jason Dean Billingsley killed Pava Marie LaPere, who was the CEO of a technology company.\r\nOfficials said LaPere, 26, was found dead Monday at 11:34 a.m. at a\u2026 [+4405 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "NDTV News"
        },
        "author": null,
        "title": "Canada Parliament Speaker Resigns Amid Row Over Praising Nazi Veteran - NDTV",
        "description": "The speaker of Canada's parliament resigned on Tuesday, days after publicly celebrating a Ukrainian veteran who fought for the Nazis during World War II.",
        "url": "https://www.ndtv.com/world-news/canada-parliament-speaker-resigns-after-row-over-praising-nazi-veteran-4427112",
        "urlToImage": "https://c.ndtvimg.com/2023-09/8jbg5hug_anthony-rota-_625x300_25_September_23.jpg",
        "publishedAt": "2023-09-27T01:06:43Z",
        "content": "Speaker Anthony Rota, who became speaker in 2019, apologized on Sunday amid a huge controversy.\r\nOttawa: The speaker of Canada's parliament resigned on Tuesday, days after publicly celebrating a Ukra\u2026 [+3770 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "BBC News"
        },
        "author": "https://www.facebook.com/bbcnews",
        "title": "Climate change: Six young people take 32 countries to court - BBC",
        "description": "They claim governments' slow action on climate change violates their human rights.",
        "url": "https://www.bbc.com/news/world-europe-66923590",
        "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/4854/production/_131261581_whatsappimage2023-09-23at20.46.45-1copy.jpg",
        "publishedAt": "2023-09-27T00:53:18Z",
        "content": "\"What I felt was fear,\" says Claudia Duarte Agostinho as she remembers the extreme heatwave and fires that ripped through Portugal in 2017 and killed more than 100 people. \"The wildfires made me real\u2026 [+5945 chars]"
      },
      {
        "source": {
          "id": "abc-news",
          "name": "ABC News"
        },
        "author": "Dr. Jade Cobern",
        "title": "Scientists say some tests may be able to identify the markers of prolonged COVID symptoms in the future - ABC News",
        "description": "This data joins a large movement to gain understanding of long COVID conditions.",
        "url": "https://abcnews.go.com/Health/scientists-tests-identify-markers-prolonged-covid-symptoms-future/story?id=103509942",
        "urlToImage": "https://i.abcnewsfe.com/a/eff8a983-66ad-4cbc-a039-6ff986280c81/covid-bloodtest-gty-ps-230926_1695739769359_hpMain_16x9.jpg?w=992",
        "publishedAt": "2023-09-27T00:47:55Z",
        "content": "While there is no specific test to determine if someone is experiencing long COVID, a new study published in Nature used blood tests to find new insight into what biological markers are associated wi\u2026 [+3470 chars]"
      },
      {
        "source": {
          "id": "nbc-news",
          "name": "NBC News"
        },
        "author": "Scott Wong, Kyle Stewart, Lori Rampani, Rebecca Kaplan",
        "title": "House Republicans get some momentum after two embarrassing setbacks - NBC News",
        "description": "After two embarrassing failed votes last week, House Republicans advanced a package of spending bills ahead of a possible government shutdown.",
        "url": "https://www.nbcnews.com/politics/congress/house-republicans-get-momentum-two-embarrassing-setbacks-rcna117401",
        "urlToImage": "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2023-09/230926-kevin-mccarthy-jm-1232-828519.jpg",
        "publishedAt": "2023-09-27T00:19:00Z",
        "content": "WASHINGTON \u00A0After two embarrassing failed votes last week, House Republicans regrouped Tuesday and voted to open debate on a package of spending bills they hope will unlock votes to keep the governme\u2026 [+2218 chars]"
      },
      {
        "source": {
          "id": "fox-news",
          "name": "Fox News"
        },
        "author": "Andrea Vacchiano",
        "title": "Florida man gets bitten by rabies-infested otter while feeding ducks: officials - Fox News",
        "description": "A 74-year-old man in Florida was attacked and wounded by a rabies-infested otter last week, officials say. A dog was also bitten by the rabid otter.",
        "url": "https://www.foxnews.com/us/florida-man-gets-bitten-rabies-infested-otter-feeding-ducks-officials",
        "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2023/09/Otter-2.jpg",
        "publishedAt": "2023-09-27T00:13:00Z",
        "content": "A 74-year-old man in Florida was recently scratched and bitten by an otter that later tested positive for rabies, officials say.\r\nThe Florida Department of Health confirmed that the 3-year-old male o\u2026 [+1501 chars]"
      },
      {
        "source": {
          "id": "cnn",
          "name": "CNN"
        },
        "author": "Brian Fung",
        "title": "US government and 17 states sue Amazon in landmark monopoly case - CNN",
        "description": "The US government and 17 states are suing Amazon in a landmark monopoly case reflecting years of allegations that the e-commerce giant abused its economic dominance and harmed fair competition.",
        "url": "https://www.cnn.com/2023/09/26/tech/ftc-sues-amazon-antitrust-monopoly-case/index.html",
        "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/230925150949-01-amazon-us-fulfillment-center-file.jpg?c=16x9&q=w_800,c_fill",
        "publishedAt": "2023-09-27T00:02:00Z",
        "content": "The US government and 17 states are suing Amazon in a landmark monopoly case reflecting years of allegations that the e-commerce giant abused its economic dominance and harmed fair competition. \r\nThe\u2026 [+10809 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "[Removed]"
        },
        "author": null,
        "title": "[Removed]",
        "description": "[Removed]",
        "url": "https://removed.com",
        "urlToImage": null,
        "publishedAt": "1970-01-01T00:00:00Z",
        "content": "[Removed]"
      }
    ]
  
export const AllNewsScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false)
    const [allNews, setAllNews] = useState([])
    const [searchString, setSearchString] = useState("")
    const [filteredNews, setFilteredNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {theme} = useTheme()
    const route = useRoute();
    const { language } = useLanguage()
    const styles = getStyles(theme);



    useEffect(() => {
        navigation.setOptions({
            title: localization[language][route.name],
        })
    }, [language])

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
            setAllNews(API_DATA)
            setFilteredNews(API_DATA)

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


