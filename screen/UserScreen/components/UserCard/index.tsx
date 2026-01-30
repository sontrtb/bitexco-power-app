import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import TextUi from '@/components/ui/TextUi';
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import { useAuth } from '@/stores/useAuth';
import { PADDING_PAGE } from '@/theme/layout';
import { ImageBackground } from "expo-image";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function UserCard() {
    const { user } = useAuth()

    const router = useRouter()

    return (
        <TouchableOpacityUi onPress={() => router.push("/user-update")}>
            <ImageBackground source={require("@/assets/images/bg_header_setting.png")} style={styles.root} imageStyle={styles.imgBg}>
                <Row style={{ justifyContent: "flex-start" }}>
                    <ImageUi
                        source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAwtmhR_SC4mux-dZErc0HQmQExycuiTZ4w&s"
                        }}
                        style={styles.avt}
                    />
                    <View style={styles.content}>
                        <TextUi style={styles.title}>Xin chào</TextUi>
                        <TextUi style={styles.fullname}>{user?.fullname}</TextUi>
                    </View>
                </Row>
            </ImageBackground>
        </TouchableOpacityUi>
    )
}

export default UserCard

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
    },
    imgBg: {
        borderRadius: 12
    },
    avt: {
        height: 52,
        width: 52,
        borderRadius: 35
    },
    title: {
        fontSize: 10,
        color: "#fff"
    },
    content: {
        width: windowWidth - PADDING_PAGE * 2 - 100,

    },
    fullname: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600"
    }
})