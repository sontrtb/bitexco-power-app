import { getNewsDetail } from "@/api/news";
import ActivityIndicatorUi from "@/components/ui/ActivityIndicatorUi";
import ImageUi from "@/components/ui/ImageUi";
import RenderHtmlUi from "@/components/ui/RenderHtmlUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { dateTimeFormat } from "@/lib/date";
import { renderURLFile } from "@/lib/file";
import { PADDING_PAGE } from "@/theme/layout";
import Feather from "@expo/vector-icons/Feather";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function NewsDetail() {
    const color = useColor()

    const { id } = useLocalSearchParams();

    const getNewsDetailQuery = useQuery({
        queryFn: () => getNewsDetail(Number(id)),
        queryKey: ["getNewsDetail", id]
    })
    const news = getNewsDetailQuery.data?.data

    if(getNewsDetailQuery.isLoading) {
        return (
            <View>
                <ActivityIndicatorUi />
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={[styles.root, {backgroundColor: color.bg}]}>
            {
                news?.thumbnail &&
                <ImageUi
                    source={{
                        uri: renderURLFile(news?.thumbnail),
                    }}
                    style={styles.image}
                />
            }

            <TextUi style={[styles.title, { color: color.primary }]}>{news?.title}</TextUi>
            <Row style={styles.timeWrap}>
                <Feather name="clock" size={14} color={color.textNeutral} />
                <TextUi style={[styles.time, {color: color.textNeutral}]}>{dateTimeFormat(news?.createdAt)}</TextUi>
            </Row>
            <RenderHtmlUi htmlString={news?.content}/>
        </ScrollView>
    )
}

export default NewsDetail

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        gap: 8,
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: "500"
    },
    image: {
        width: windowWidth - PADDING_PAGE * 2,
        height: windowWidth / 2,
        borderRadius: 8
    },
    time: {
        fontSize: 12,
    },
    timeWrap: {
        justifyContent: "flex-start",
        gap: 6
    }
})