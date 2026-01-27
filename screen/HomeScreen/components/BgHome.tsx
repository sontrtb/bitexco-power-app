import useColor from '@/hooks/useColor';
import { Image } from 'expo-image';
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function BgHome() {
    const color = useColor();

    return (
        <View style={[styles.root, {backgroundColor: color.primary}]}>
            <Image
                source={require('@/assets/images/bg_home.png')}
                style={styles.imgBg}
                contentPosition="bottom"
                resizeMode="cover"
            />
            <View style={styles.overlay} />
        </View>
    )
}

export default BgHome

const styles = StyleSheet.create({
    root: {
        height: 600,
        width: windowWidth,
        position: "absolute",
        top: 0,
        left: 0
    },
    imgBg: {
        width: 291,
        height: 273,
        position: "absolute",
        objectFit: "fill",
        right: -60,
        top: 50
    },
    overlay: {
        width: windowWidth,
        height: 600,
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    }
})