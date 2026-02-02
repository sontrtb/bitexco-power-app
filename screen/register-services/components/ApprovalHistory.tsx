import LineUi from "@/components/ui/LineUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, View } from "react-native";

function ApprovalHistory() {
    return (
        <View style={styles.root}>
            <View style={styles.timeWrap}>
                <Feather name="clock" size={18} color="black" />
                <TextUi style={styles.label}>12/09/2024</TextUi>
            </View>

            <Row>
                <TextUi style={[styles.textRow, {fontWeight: "600"}]}>Nội dung</TextUi>
                <TextUi style={styles.textRow}>Trình ký</TextUi>
            </Row>
            <Row>
                <TextUi style={[styles.textRow, {fontWeight: "600"}]}>Người thực hiện</TextUi>
                <TextUi style={styles.textRow}>Nguyễn Văn A</TextUi>
            </Row>
            <Row>
                <TextUi style={[styles.textRow, {fontWeight: "600"}]}>Chức danh</TextUi>
                <TextUi style={styles.textRow}>Nhân viên</TextUi>
            </Row>

            <LineUi />
        </View>
    )
}

export default ApprovalHistory

const styles = StyleSheet.create({
    root: {
        gap: 8,
        marginTop: 16
    },
    label: {
        fontWeight: "500"
    },
    timeWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    textRow: {
        flex: 1,
        fontSize: 12
    }
})
