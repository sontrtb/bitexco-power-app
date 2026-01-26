import { IRepairService, IRepairServiceHis } from "@/api/repair-service";
import CardUi from "@/components/ui/CardUi";
import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import Tag from "@/components/ui/Tag";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { renderURLFile } from "@/lib/file";
import { PADDING_PAGE } from '@/theme/layout';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { STATUS_OPTIONS } from "../../const";

const HistoriesRepairItem = ({ item, renderRepairService }: { item: IRepairServiceHis, renderRepairService: (id: number) => IRepairService | undefined }) => {
    const color = useColor()

    const router = useRouter()

    const repairService = renderRepairService(item.serviceId)

    const statusText = STATUS_OPTIONS.find(s => s.value === item.status)

    return (
        <TouchableOpacityUi
            onPress={() => {
                router.push(`/repair-service/detail/${item.id}`)
            }}
        >
            <CardUi style={styles.item}>
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
                    <Feather name="phone" size={20} color={color.primary} />
                    <TextUi >{item.phoneNumber}</TextUi>
                </Row>

                <View style={[styles.line, { backgroundColor: color.borderColor }]} />

                <TextUi >{item.description}</TextUi>
            </CardUi>
        </TouchableOpacityUi>
    )
};


export default HistoriesRepairItem

const styles = StyleSheet.create({
    repairService: {
        justifyContent: "flex-start",
    },
    item: {
        marginBottom: PADDING_PAGE,
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
})