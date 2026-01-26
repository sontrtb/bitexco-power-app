import { getDetailRepairServiceHistory, getRepairService } from "@/api/repair-service";
import CardUi from "@/components/ui/CardUi";
import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import Tag from "@/components/ui/Tag";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { dateTimeFormat } from "@/lib/date";
import { renderURLFile } from "@/lib/file";
import { PADDING_PAGE } from "@/theme/layout";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { STATUS_OPTIONS } from "../const";

function HistoriesRepairServiceScreenDetail() {
    const { id } = useLocalSearchParams();

    const color = useColor()

    const getRepairServiceQuery = useQuery({
        queryKey: ["getRepairService"],
        queryFn: getRepairService
    })

    const renderRepairService = (id?: number) => {
        return getRepairServiceQuery.data?.data.find(r => r.id === id)
    }

    const getDetailRepairServiceHistoryQuery = useQuery({
        queryKey: ["getDetailRepairServiceHistory", id],
        queryFn: () => getDetailRepairServiceHistory(Number(id))
    })
    const data = getDetailRepairServiceHistoryQuery.data?.data

    const statusText = STATUS_OPTIONS.find(s => s.value === data?.status)
    const repairService = renderRepairService(data?.serviceId)

    if (!data) {
        return (
            <View />
        )
    }

    return (
        <ScrollView contentContainerStyle={[styles.root, {backgroundColor: color.bg}]}>
            <CardUi style={styles.item} title="Yêu cầu">
                <Row>
                    <Row style={styles.repairService}>
                        <View style={[
                            styles.iconWrap,
                            {
                                backgroundColor: color.bgImage
                            }
                        ]}>
                            <ImageUi
                                source={{
                                    uri: renderURLFile(repairService?.imagePath)
                                }}
                                style={[styles.icon]}
                            />
                        </View>
                        <TextUi>{repairService?.name}</TextUi>
                    </Row>

                    <Tag
                        text={statusText?.label}
                    />
                </Row>
                <Row style={{ justifyContent: "flex-start" }}>
                    <Feather name="calendar" size={20} color={color.primary} />
                    <TextUi >{dateTimeFormat(data.createdAt)}</TextUi>
                </Row>
                <Row style={{ justifyContent: "flex-start" }}>
                    <Feather name="phone" size={20} color={color.primary} />
                    <TextUi >{data?.phoneNumber}</TextUi>
                </Row>

                <View style={[styles.line, { backgroundColor: color.borderColor }]} />

                <TextUi >{data?.description}</TextUi>
                {
                    data.requestImage && (
                        <ImageUi
                            source={{
                                uri: renderURLFile(data.requestImage)
                            }}
                            style={[styles.image]}
                        />
                    )
                }
            </CardUi>
            
             {
                data.status === 1 &&
                <CardUi title="Đang xử lý" style={{ gap: 10 }}>
                    <Row style={{ justifyContent: "flex-start" }}>
                        <Feather name="calendar" size={20} color={color.primary} />
                        <TextUi >{dateTimeFormat(data.handleDate)}</TextUi>
                    </Row>
                </CardUi>
            }
            

            {
                data.status === 2 &&
                <CardUi title="Kết quả xử lý" style={{ gap: 10 }}>
                    <TextUi >{data?.response}</TextUi>
                    <Row style={{ justifyContent: "flex-start" }}>
                        <Feather name="calendar" size={20} color={color.primary} />
                        <TextUi >{dateTimeFormat(data.completeDate)}</TextUi>
                    </Row>
                    {
                        data.responseImage && (
                            <ImageUi
                                source={{
                                    uri: renderURLFile(data.responseImage)
                                }}
                                style={[styles.image]}
                            />
                        )
                    }
                </CardUi>
            }
        </ScrollView>
    )
}

export default HistoriesRepairServiceScreenDetail

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        padding: PADDING_PAGE,
        gap: PADDING_PAGE
    },
    repairService: {
        justifyContent: "flex-start",
    },
    item: {
        gap: 10
    },
    iconWrap: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    icon: {
        width: 30,
        height: 30,
    },
    line: {
        width: "100%",
        height: 1
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8
    }
})