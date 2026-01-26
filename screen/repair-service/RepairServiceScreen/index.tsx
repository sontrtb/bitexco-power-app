import { getRepairService } from "@/api/repair-service";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import { Dimensions, StyleSheet, View } from "react-native";
import RepairServiceItem from "./components/RepairServiceItem";

function RepairServiceScreen() {
    const color = useColor()

    const getRepairServiceQuery = useQuery({
        queryKey: ["getRepairService"],
        queryFn: getRepairService
    })

    return (
        <View style={[styles.root, {backgroundColor: color.bg}]}>
            {
                getRepairServiceQuery.data?.data?.map((u, index) => (
                    <View key={index} style={styles.item}>
                        <RepairServiceItem {...u} />
                    </View>
                ))
            }
        </View>
    )
}

export default RepairServiceScreen

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: PADDING_PAGE,
        padding: PADDING_PAGE,
        justifyContent: "flex-start",
        flex: 1
    },
    item: {
        marginTop: 10,
        width: (Dimensions.get('window').width - PADDING_PAGE * 2 - 60) / 4,
    }
})