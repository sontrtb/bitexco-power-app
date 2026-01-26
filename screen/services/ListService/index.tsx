import { getServices } from "@/api/services";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import { Dimensions, StyleSheet, View } from "react-native";
import ServiceItem from "./components/ServiceItem";

function ListService() {

    const color = useColor()

    const getServicesQuery = useQuery({
        queryKey: ["getServices"],
        queryFn: getServices
    })

    return (
        <View style={[styles.root, {backgroundColor: color.bg}]}>
            {
                getServicesQuery.data?.data?.map((u, index) => (
                    <View key={index} style={styles.item}>
                        <ServiceItem {...u} />
                    </View>
                ))
            }
        </View>
    )
}

export default ListService

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