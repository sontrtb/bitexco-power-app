import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import IcSocket from "@/icons/IcSocket";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, View } from "react-native";

function RevenueOutputItem({type}: {type: "revenue" | "output"}) {
    const textColor = type === "output" ? "#744C5A" : "#4C6D74"
    const bgColor = type === "output" ? "#FFEEEB" : "#EBF4FF"
    const text = type === "output" ? "SẢN LƯỢNG" : "DOANH THU"

    return (
        <View style={[styles.item, {backgroundColor: bgColor}]} >
            <Row>
                <Row>
                    {type === "output" ? <IcSocket /> : <FontAwesome name="usd" size={22} color="#4C6D74" />}
                    <View>
                        <TextUi style={{color: textColor}}>{text}</TextUi>
                        <TextUi style={{color: textColor}}>NGÀY DD/MM</TextUi>
                    </View>
                </Row>

                <TextUi style={[styles.textOutput, {color: textColor}]}>661,233MWh</TextUi>
            </Row>

        </View>
    )
}

function RevenueOutput() {
    const data = ['Ngày', 'Tháng', 'Năm']

    return (
        <View style={styles.root}>
            {
                data.map((d, index) => {
                    return (
                        <RevenueOutputItem key={index} type="output" />
                    )
                })
            }

            {
                data.map((d, index) => {
                    return (
                        <RevenueOutputItem key={index} type="revenue" />
                    )
                })
            }
        </View>
    )
}

export default RevenueOutput

const styles = StyleSheet.create({
    root: {
        gap: 8
    },
    item: {
        padding: 16,
        borderRadius: 24,
    },
    textOutput: {
        fontSize: 16,
        fontWeight: "bold"
    }
})