import { getResidentCommentDetail } from "@/api/residents-opinions";
import CardUi from "@/components/ui/CardUi";
import KeyboardAvoidingViewUi from "@/components/ui/KeyboardAvoidingViewUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import useColor from "@/hooks/useColor";
import { dateTimeFormat } from "@/lib/date";
import { renderURLFile } from "@/lib/file";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { getStatus } from "../utils/getStatus";
import Feedback from "./components/Feedback";

function ResidentsOpinionsDetailScreen() {
    const color = useColor()

    const { id } = useLocalSearchParams();

    const getResidentCommentsQuery = useQuery({
        queryFn: () => getResidentCommentDetail(Number(id)),
        queryKey: ["getResidentCommentDetail", id]
    })
    const residentComment = getResidentCommentsQuery.data?.data

    if (getResidentCommentsQuery.isLoading) {
        return (
            <View style={[styles.root, styles.center]}>
                <ActivityIndicator size="large" color={color.primary} />
            </View>
        )
    }

    if (getResidentCommentsQuery.isError || !residentComment) {
        return (
            <View style={[styles.root, styles.center]}>
                <TextUi style={[styles.errorText, { color: color.text }]}>
                    Không thể tải thông tin ý kiến cư dân
                </TextUi>
            </View>
        )
    }

    const statusInfo = getStatus(residentComment.status);

    return (
        <KeyboardAvoidingViewUi contentContainerStyle={styles.root}>
            {/* Title */}
            <TitleUi>
                {residentComment.title}
            </TitleUi>

            {/* Info Grid */}
            <CardUi style={{ gap: 8 }}>
                <Row>
                    <TextUi style={[styles.label, { color: color.text + '80' }]}>Mã căn hộ:</TextUi>
                    <TextUi style={[styles.value]}>
                        {residentComment.apartmentCode}
                    </TextUi>
                </Row>

                <Row>
                    <TextUi style={[styles.label, { color: color.text + '80' }]}>Loại:</TextUi>
                    <TextUi style={[styles.value]}>
                        {residentComment.type}
                    </TextUi>
                </Row>

                <Row>
                    <TextUi style={[styles.label, { color: color.text + '80' }]}>Số điện thoại:</TextUi>
                    <TextUi style={[styles.value]}>
                        {residentComment.phoneNumber}
                    </TextUi>
                </Row>

                {residentComment.createdByName && (
                    <Row>
                        <TextUi style={[styles.label, { color: color.text + '80' }]}>Người tạo:</TextUi>
                        <TextUi style={[styles.value]}>
                            {residentComment.createdByName}
                        </TextUi>
                    </Row>
                )}

                <Row>
                    <TextUi style={[styles.label, { color: color.text + '80' }]}>Thời gian:</TextUi>
                    <TextUi style={[styles.value]}>
                        {dateTimeFormat(residentComment.createdAt)}
                    </TextUi>
                </Row>

                <Row>
                    <TextUi style={[styles.label, { color: color.text + '80' }]}>Trạng thái:</TextUi>
                    <TextUi style={[styles.statusText, { color: statusInfo.color }]}>
                        {statusInfo.text}
                    </TextUi>
                </Row>

            </CardUi>

            {/* Content */}
            <CardUi title="Nội dung">
                {residentComment.imagePath && (
                    <Image
                        source={{ uri: renderURLFile(residentComment.imagePath) }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                )}
                <TextUi>
                    {residentComment.content}
                </TextUi>
            </CardUi>

            <Feedback
                id={Number(id)}
                responses={residentComment.responses}
                onRefetch={() => getResidentCommentsQuery.refetch()}
            />
        </KeyboardAvoidingViewUi>
    )
}

export default ResidentsOpinionsDetailScreen

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        padding: PADDING_PAGE,
        gap: PADDING_PAGE
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusBadge: {
        alignSelf: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600'
    },
    label: {
        fontSize: 14,
        flex: 1
    },
    value: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
        textAlign: 'right'
    },
    image: {
        width: '100%',
        height: 230,
        borderRadius: 8,
        marginBottom: 8
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center'
    }
})