import ImageUi from "@/components/ui/ImageUi";
import { ImageBackground } from "expo-image";
import { StyleSheet } from "react-native";

function BannerProfile() {
    return (
        <ImageBackground
            source={require("@/assets/images/bg_profile.png")}
            style={styles.root}
            imageStyle={styles.image}
        >
            <ImageUi
                style={styles.avatar}
                source="https://picsum.photos/seed/696/3000/2000"
            />
        </ImageBackground>
    )
}

export default BannerProfile

const styles = StyleSheet.create({
    root: {
        height: 150, 
        overflow: 'hidden', 
    },
    image: {
        width: "100%",
        height: 150
    },
    avatar: {
        height: 160,
        width: 160,
        borderRadius: 80,
        right: -25,
        bottom: -30,
        position: "absolute"
    }
})
