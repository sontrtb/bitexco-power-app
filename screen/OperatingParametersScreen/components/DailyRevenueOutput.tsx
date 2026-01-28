import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { StyleSheet, View } from "react-native";

function DailyRevenueOutput() {
    const colors = useColor()

    return (
        <View style={styles.root}>
            <CardUi title="Sản lượng ngày">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 3, 5, 6, 3, 2, 3].map((i, index) => (
                        <View key={index} style={styles.item}>
                            <Row>
                                <TextUi style={styles.label}>Nho Quế 1</TextUi>
                                <TextUi style={styles.label}>3.123</TextUi>
                            </Row>
                            <View style={[styles.progressBar, {backgroundColor: colors.bg}]}>
                                <View style={[styles.progressBarPercent, {width: `${100 * i / 8}%`}]}/>
                            </View>
                        </View>
                    ))
                }
            </CardUi>

            <CardUi title="Doanh thu ngày">
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 3, 5, 6, 3, 2, 3].map((i, index) => (
                        <View key={index} style={styles.item}>
                            <Row>
                                <TextUi style={styles.label}>Nho Quế 1</TextUi>
                                <TextUi style={styles.label}>3.123</TextUi>
                            </Row>
                            <View style={[styles.progressBar, {backgroundColor: colors.bg}]}>
                                <View style={[styles.progressBarPercent, {width: `${100 * i / 8}%`}]}/>
                            </View>
                        </View>
                    ))
                }
            </CardUi>
        </View>
    )
}

export default DailyRevenueOutput

const styles = StyleSheet.create({
    root: {
        gap: PADDING_PAGE
    },
    item: {
        marginBottom: 8
    },
    label: {
        fontSize: 12,
    },
    progressBar: {
        height: 12,
        width: "100%",
        borderRadius: 6,
        marginTop: 2
    },
    progressBarPercent: {
        height: 12,
        borderRadius: 6,
        backgroundColor: "#5E5CE6"
    }
})