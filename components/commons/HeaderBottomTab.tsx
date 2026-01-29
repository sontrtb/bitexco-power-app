import { PADDING_PAGE } from '@/theme/layout';
import Constants from 'expo-constants';
import { ImageBackground } from "expo-image";
import { StyleSheet } from "react-native";
import TextUi from "../ui/TextUi";

const statusBarHeight = Constants.statusBarHeight;

interface IHeaderBottomTab {
    title: string,
}

function HeaderBottomTab(props: IHeaderBottomTab) {
    const {title} = props

    return (
        <ImageBackground source={require("@/assets/images/bg_header_bottom_tab.png")} style={styles.image}>
            <TextUi style={styles.title}>{title}</TextUi>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 150 + statusBarHeight,
        paddingLeft: PADDING_PAGE * 2,
        justifyContent: "center"
    },
    title: {
        fontSize: 26,
        color: "#fff",
        fontWeight: "300"
    }
})

export default HeaderBottomTab