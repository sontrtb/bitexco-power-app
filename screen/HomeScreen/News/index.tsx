import { IPage } from "@/api/api";
import { getNews } from "@/api/news";
import CardUi from "@/components/ui/CardUi";
import CaurouselUi from "@/components/ui/CaurouselUi";
import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { dateTimeFormat } from "@/lib/date";
import { renderURLFile } from "@/lib/file";
import { PADDING_PAGE } from "@/theme/layout";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function News() {
    const color = useColor()
    const routers = useRouter()

    const page: IPage = {
        page: 0,
        size: 5
    }
    const getNewsQuery = useQuery({
        queryKey: ["getNews", page],
        queryFn: () => getNews(page)
    })

    return (
        <View style={styles.root}>
            <Row style={{ paddingHorizontal: PADDING_PAGE }}>
                <TitleUi style={styles.title}>Tin tức</TitleUi>
                <Link href="/news">
                    <TextUi style={{ color: color.primary }}>Xem thêm</TextUi>
                </Link>
            </Row>

            <CaurouselUi style={styles.container} length={getNewsQuery.data?.data?.length ?? 0}>
                {
                    getNewsQuery.data?.data.map((news, index) => {
                        return (
                            <TouchableOpacityUi
                                key={index}
                                style={styles.page}
                                onPress={() => {
                                    routers.push(`/news/${news.id}`)
                                }}
                            >
                                <CardUi style={styles.card} key="1">
                                    {
                                        news.thumbnail &&
                                        <ImageUi
                                            source={{
                                                uri: renderURLFile(news.thumbnail),
                                            }}
                                            style={styles.imageNews}
                                        />
                                    }

                                    <View style={styles.contentNews}>
                                        <TextUi style={styles.newsTitle} numberOfLines={2}>{news.title}</TextUi>
                                        <TextUi numberOfLines={2}>{news.summary}</TextUi>
                                        <Row style={styles.timeWrap}>
                                            <Feather name="clock" size={16} color="#525252" />
                                            <TextUi style={styles.time}>{dateTimeFormat(news.createdAt)}</TextUi>
                                        </Row>
                                    </View>
                                </CardUi>
                            </TouchableOpacityUi>
                        )
                    })
                }
            </CaurouselUi>
        </View>
    )
}

export default News

const styles = StyleSheet.create({
    root: {
        marginTop: PADDING_PAGE
    },
    title: {
        paddingBottom: PADDING_PAGE / 2
    },
    container: {
        height: 300,
    },
    page: {
        width: windowWidth,
        paddingHorizontal: PADDING_PAGE,
    },
    card: {
        padding: 0
    },
    imageNews: {
        height: 160,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    contentNews: {
        padding: PADDING_PAGE
    },
    newsTitle: {
        fontSize: 16,
        textTransform: "uppercase",
        lineHeight: 22,
        fontWeight: "500"
    },
    time: {
        fontSize: 12,
        fontWeight: "500"
    },
    timeWrap: {
        justifyContent: "flex-start",
        marginTop: 8
    },

    //
    normalText: {
        fontSize: 14
    },
    bigText: {
        fontSize: 20
    }
})