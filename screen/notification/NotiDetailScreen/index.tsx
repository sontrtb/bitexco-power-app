import { getNotificationDetail, markAsReadNotification } from "@/api/notifications";
import ImageUi from "@/components/ui/ImageUi";
import LoadingScreen from "@/components/ui/LoadingScreen";
import RenderHtmlUi from "@/components/ui/RenderHtmlUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { dateTimeFormat } from "@/lib/date";
import { renderURLFile } from "@/lib/file";
import { PADDING_PAGE } from "@/theme/layout";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Directory, File, Paths } from 'expo-file-system';
import { useLocalSearchParams } from "expo-router";
import * as Sharing from 'expo-sharing';
import React, { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;

function NotiDetailScreen() {
    const color = useColor()

    const { id } = useLocalSearchParams();

    const getNotiDetailQuery = useQuery({
        queryFn: () => getNotificationDetail(Number(id)),
        queryKey: ["getNotificationDetail", id]
    })
    const notiData = getNotiDetailQuery.data?.data

    // Đánh dấu đã đọc
    const markAsReadNotificationMutation = useMutation({
        mutationFn: markAsReadNotification
    })
    useEffect(() => {
        if (notiData?.status === 0) {
            markAsReadNotificationMutation.mutate(Number(id))
        }
    }, [id, markAsReadNotificationMutation, notiData?.status])

    const downloadFile = async () => {
        if (!notiData?.attachment) return;
        const linkFile = renderURLFile(notiData.attachment);

        try {
            const destination = new Directory(Paths.document, 'downloads');

            // Kiểm tra và chỉ tạo nếu chưa tồn tại
            if (!destination.exists) {
                destination.create({ intermediates: true });
            }

            const file = await File.downloadFileAsync(linkFile!, destination, {
                idempotent: true
            });

            await Sharing.shareAsync(file.uri);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };

    return (
        <LoadingScreen isLoading={getNotiDetailQuery.isLoading}>
            <ScrollView contentContainerStyle={[styles.root, {backgroundColor: color.bg}]}>
                {
                    notiData?.thumbnail &&
                    <ImageUi
                        source={{
                            uri: renderURLFile(notiData.thumbnail),
                        }}
                        style={styles.image}
                    />
                }

                <TextUi style={[styles.title, { color: color.primary }]}>{notiData?.title}</TextUi>
                <TextUi>{notiData?.content}</TextUi>

                {
                    notiData?.notificationTriggerTime &&
                    <Row style={styles.timeWrap}>
                        <Feather name="clock" size={14} color="#525252" />
                        <TextUi style={styles.time}>{dateTimeFormat(notiData.notificationTriggerTime)}</TextUi>
                    </Row>
                }

                <RenderHtmlUi htmlString={notiData?.detailContent}/>

                {
                    notiData?.attachment &&
                    <TouchableOpacityUi
                        style={[styles.fileWrap, { backgroundColor: color.bgImage }]}
                        onPress={downloadFile}
                    >
                        <Feather name="file" size={20} color={color.primary} />
                        <TextUi>Tệp đính kèm</TextUi>
                    </TouchableOpacityUi>
                }
            </ScrollView>
        </LoadingScreen>
    )
}

export default NotiDetailScreen

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        gap: 8,
        flexGrow: 1
    },
    title: {
        fontSize: 18,
        fontWeight: "500"
    },
    image: {
        width: windowWidth - PADDING_PAGE * 2,
        height: windowWidth / 2,
        borderRadius: 8
    },
    time: {
        fontSize: 12,
        fontWeight: "500"
    },
    timeWrap: {
        justifyContent: "flex-start",
        gap: 6
    },
    fileWrap: {
        flexDirection: "row",
        gap: 8,
        padding: 12,
        borderRadius: 8
    }
})