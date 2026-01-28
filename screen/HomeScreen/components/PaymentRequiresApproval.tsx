import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import Entypo from '@expo/vector-icons/Entypo';
import { ImageBackground } from 'expo-image';
import { StyleSheet, View } from "react-native";

function PaymentRequiresApproval() {
    const color = useColor()

    return (
        <CardUi style={{ padding: 0 }}>
            <ImageBackground
                source={require("@/assets/images/bg_card.png")}
                style={styles.image}
            >
                <Row>
                    <TextUi style={styles.title}>Đề nghị thanh toán cần phê duyệt</TextUi>

                    <TouchableOpacityUi style={styles.chevron}>
                        <Entypo name="chevron-small-right" size={32} color="black" />
                    </TouchableOpacityUi>
                </Row>

                <View style={[styles.line, { backgroundColor: color.borderColor }]} />

                <View style={styles.emptry}>
                    <TextUi style={[styles.textEmptry, { color: color.textNeutral }]}>
                        Không có đề nghị thanh toán cần phê duyệt.
                    </TextUi>
                    <TextUi style={[styles.textEmptry, { color: color.textNeutral }]}>
                        Hãy tiếp tục làm tốt công việc của mình!
                    </TextUi>
                </View>
            </ImageBackground>
        </CardUi>
    )
}

export default PaymentRequiresApproval

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE
    },
    image: {
        height: 200,
        padding: 12
    },
    title: {
        color: "#000",
        fontSize: 16,
        fontWeight: "semibold"
    },
    chevron: {
        height: 32,
        width: 32,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16
    },
    line: {
        height: 1.5,
        width: "100%",
        marginVertical: 8
    },
    textEmptry: {
        textAlign: "center"
    },
    emptry: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})