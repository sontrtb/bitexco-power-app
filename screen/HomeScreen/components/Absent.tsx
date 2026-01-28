import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import Octicons from '@expo/vector-icons/Octicons';
import { StyleSheet, View } from "react-native";

function Absent() {
    const colors = useColor();

    return (
        <View style={styles.root}>
            <Octicons name="clock-fill" size={32} color={colors.textNeutral} />
            <TextUi style={{color: colors.textNeutral}}>Không có vắng mặt trong tuần</TextUi>
        </View>
    )
}

export default Absent

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 20
    }
})