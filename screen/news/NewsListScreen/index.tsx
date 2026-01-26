import { getNews, INews } from "@/api/news";
import FlatListLazy from "@/components/commons/FlatListLazy";
import CardUi from "@/components/ui/CardUi";
import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { dateTimeFormat } from "@/lib/date";
import { renderURLFile } from "@/lib/file";
import { headersImage } from "@/lib/image";
import { PADDING_PAGE } from "@/theme/layout";
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

function NewsListScreen() {
    const color = useColor()
    const router = useRouter()

    return (
        <FlatListLazy<INews>
                keyExtractor={item => item.id.toString()}
                     renderItem={({ item }) => {
                return (
                    <TouchableOpacityUi onPress={() => {
                        router.navigate(`/news/${item.id}`)
                    }}>
                        <CardUi style={styles.item}>
                            {
                                item.thumbnail &&
                                <ImageUi
                                    source={{
                                        uri: renderURLFile(item.thumbnail),
                                        headers: headersImage()
                                    }}
                                    style={styles.imageNews}
                                />
                            }

                            <View style={styles.content}>
                                <View>
                                    <TextUi style={styles.title} numberOfLines={2}>{item.title}</TextUi>
                                    <TextUi numberOfLines={2}>{item.summary}</TextUi>
                                </View>
                                <Row style={{ justifyContent: "flex-start", marginTop: 16 }}>
                                    <Feather name="clock" size={14} color={color.disable} />
                                    <TextUi style={{ fontSize: 12, color: color.disable }}>{dateTimeFormat(item.createdAt)}</TextUi>
                                </Row>
                            </View>
                        </CardUi>
                    </TouchableOpacityUi>
                )
            }}
                queryKey={["getNews"]}
                queryFn={getNews}
            />
    )
}

export default NewsListScreen

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        paddingBottom: PADDING_PAGE * 2
    },
    item: {
        marginBottom: PADDING_PAGE,
        padding: 0,
        flexDirection: "row"
    },
    imageNews: {
        height: 120,
        width: 150,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    content: {
        padding: 12,
        flex: 1,
        justifyContent: "space-between"
    },
    title: {
        fontWeight: "500",
    }
})