import useColor from '@/hooks/useColor';
import { PADDING_PAGE } from '@/theme/layout';
import Feather from '@expo/vector-icons/Feather';
import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { ReactElement } from 'react';
import { Dimensions, StyleSheet, View } from "react-native";
import KeyboardAvoidingViewUi from '../ui/KeyboardAvoidingViewUi';
import TouchableOpacityUi from '../ui/TouchableOpacityUi';


const windowWidth = Dimensions.get('window').width;

interface AuthLayoutProps {
    children: ReactElement,
    backAction?: () => void,
}

function AuthLayout({ children, backAction }: AuthLayoutProps) {
    const color = useColor()

    return (
        <KeyboardAvoidingViewUi
            contentContainerStyle={styles.root}
            bounces={false}
        >

            {
                backAction &&
                <TouchableOpacityUi style={styles.backBtnWrap} onPress={backAction}>
                    <GlassView style={[styles.backBtn, {borderColor: color.borderColor}]} glassEffectStyle="clear">
                        <Feather name="arrow-left" size={28} color={color.text}/>
                    </GlassView>
                </TouchableOpacityUi>
            }

            <View style={{ flex: 1 }}>
                {children}
            </View>


            <Image
                source={require('@/assets/images/bg_auth.png')}
                style={styles.imgBg}
                contentPosition="bottom"
                resizeMode="cover"
            />
        </KeyboardAvoidingViewUi>
    )
}

export default AuthLayout

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        paddingBottom: PADDING_PAGE
    },
    backBtnWrap: {
        position: "absolute",
        top: 60,
        left: PADDING_PAGE,
        zIndex: 1000,
    },
    backBtn: {
        height: 42,
        width: 42,
        borderRadius: 21,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },
    imageBg: {
        width: "100%"
    },
    textBack: {
        color: "#fff",
        fontSize: 16
    },
    logoWrap: {
        position: "absolute",
        right: 20,
    },
    imgBg: {
        width: windowWidth,
        height: windowWidth * 1/2,
        position: "absolute",
        bottom: 0
    }
})
