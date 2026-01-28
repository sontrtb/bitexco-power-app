import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import SpaceUi from "@/components/ui/SpaceUi";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, View } from "react-native";

function Timekeeping() {
    const colors = useColor()
    return (
        <CardUi style={styles.root}>
            <SelectOptionUi
                placeholder="Bitexco Power"
                options={[
                    {
                        value: "1",
                        label: "Bitexco Power"
                    }
                ]}
            />
            <SpaceUi height={16} />
            <TextUi weight="semiBold">Hôm nay, 05/11/2025</TextUi>
            <SpaceUi height={16} />
            <View>
                <TextUi weight="semiBold">Công</TextUi>
                <Row style={styles.row}>
                    <Feather name="calendar" size={20} color={colors.textNeutral} />
                    <TextUi style={{ color: colors.textNeutral }}>21</TextUi>
                </Row>
            </View>

            <SpaceUi height={16} />

            <View style={styles.timeWrap}>
                <View style={styles.timeItem}>
                    <TextUi weight="semiBold">Giờ vào</TextUi>
                    <Row style={styles.row}>
                        <Feather name="calendar" size={20} color={colors.textNeutral} />
                        <TextUi style={{ color: colors.textNeutral }}>08:00AM</TextUi>
                    </Row>
                    <Row style={styles.row}>
                        <Feather name="calendar" size={20} color={colors.textNeutral} />
                        <TextUi style={{ color: colors.textNeutral }}>Đến đúng giờ</TextUi>
                    </Row>
                </View>
                <View style={styles.timeItem}>
                    <TextUi weight="semiBold">Giờ ra</TextUi>
                    <Row style={styles.row}>
                        <Feather name="calendar" size={20} color={colors.textNeutral} />
                        <TextUi style={{ color: colors.textNeutral }}>17:25PM</TextUi>
                    </Row>
                    <Row style={styles.row}>
                        <Feather name="calendar" size={20} color={colors.textNeutral} />
                        <TextUi style={{ color: colors.textNeutral }}>Về sớm 5 phút</TextUi>
                    </Row>
                </View>
            </View>
        </CardUi>
    )
}

export default Timekeeping

const styles = StyleSheet.create({
    root: {

    },
    row: {
        justifyContent: "flex-start",
        marginTop: 10
    },
    timeWrap: {
        flexDirection: "row"
    },
    timeItem: {
        flex: 1
    }
})