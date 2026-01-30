import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";

const statusBarHeight = Constants.statusBarHeight;


function HeaderSetting() {
    const colors = useColor();

    return (
        <View style={[styles.root, {backgroundColor: colors.bgCard}]}>
            <TextUi style={styles.title}>Cài đặt</TextUi>
        </View>
    )
}

export default HeaderSetting

const styles = StyleSheet.create({
    root: {
        paddingTop: statusBarHeight,
        width: "100%",
        height: 100,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "700"
    }
})
