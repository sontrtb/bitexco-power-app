import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import { PADDING_PAGE } from "@/theme/layout";
import { ImageBackground } from 'expo-image';
import { StyleSheet } from "react-native";

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};


function PaymentRequiresApproval() {
    return (
        <ImageBackground
            source={image} resizeMode="cover" style={styles.image}>
            <Row>
                <TextUi>Đề nghị thanh toán cần phê duyệt</TextUi>
            </Row>
        </ImageBackground>
    )
}

export default PaymentRequiresApproval

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE
    },
    image: {
        
    }
})