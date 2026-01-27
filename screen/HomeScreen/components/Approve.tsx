import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet, View } from "react-native";

function Approve() {
    const approves = [
        {
            text: "Tờ trình cần phê duyệt",
            count: 0
        },
        {
            text: "Tờ trình cần phê duyệt",
            count: 0
        },
        {
            text: "Tờ trình cần phê duyệt",
            count: 0
        },
        {
            text: "Tờ trình cần phê duyệt",
            count: 0
        },
        {
            text: "Tờ trình cần phê duyệt",
            count: 0
        },
    ]

    return (
        <View style={styles.root}>
            <TextUi style={styles.title}>Tôi phê duyệt</TextUi>

            <ScrollView
                contentContainerStyle={styles.approveWrap}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    approves.map((approve, index) => (
                        <TouchableOpacityUi style={styles.approve} key={index}>
                            <TextUi style={styles.approveText}>{approve.text}</TextUi>
                            <TextUi style={styles.countText}>{approve.count}</TextUi>
                        </TouchableOpacityUi>
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default Approve

const styles = StyleSheet.create({
    root: {

    },
    title: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 12
    },
    approve: {
        height: 140,
        width: 140,
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 16,
        justifyContent: "space-between",
    },
    approveWrap: {
        flexDirection: "row",
        gap: PADDING_PAGE
    },
    approveText: {
        fontWeight: "bold",
        lineHeight: 24
    },
    countText: {
        fontWeight: "semibold",
        fontSize: 50
    }
})
