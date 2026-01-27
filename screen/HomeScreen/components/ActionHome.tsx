import ButtonUi from "@/components/ui/ButtonUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import IcUser from "@/icons/IcUser";
import { StyleSheet, View } from "react-native";

function ActionHome() {
    const actions = [
        {
            label: "HRM",
            onPress: () => {}
        },
        {
            label: "VPS",
            onPress: () => {}
        },
        {
            label: "ABC",
            onPress: () => {}
        },
        {
            label: "DEF",
            onPress: () => {}
        }
    ]

    return (
        <View style={styles.root}>
            <TextUi style={{ color: "#fff" }}>Xin chào</TextUi>
            <TextUi style={styles.name}>nhanvien_123</TextUi>

            <View style={styles.actions}>
                {
                    actions.map((item, index) => (
                        <TouchableOpacityUi
                            key={index}
                            style={styles.actionItem}
                            onPress={item.onPress}
                        >
                            <View style={styles.iconWrap}>
                                <IcUser />
                            </View>
                            <TextUi style={styles.textAction}>{item.label}</TextUi>
                        </TouchableOpacityUi>
                    ))
                }
            </View>

            <Row>
                <ButtonUi
                    text="Trang cá nhân"
                    type="outline"
                    style={{flex: 1}}
                />
                <ButtonUi
                    text="Thông số vận hành"
                    style={styles.btnInforOperate}
                />
            </Row>
        </View>
    )
}

export default ActionHome

const styles = StyleSheet.create({
    root: {
        marginTop: 100
    },
    name: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 24
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 32
    },
    iconWrap: {
        height: 48,
        width: 48,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF60",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#fff"
    },
    actionItem: {
        alignItems: 'center',
        gap: 12
    },
    textAction: {
        color: "#fff"
    },
    btnInforOperate: {
        flex: 1,
        backgroundColor: "#012C2F",
        borderColor: "#012C2F",
    }
})