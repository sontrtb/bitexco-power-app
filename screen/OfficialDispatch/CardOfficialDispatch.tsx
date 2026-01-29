import BottomSheet from "@/components/ui/BottomSheet";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import SpaceUi from "@/components/ui/SpaceUi";
import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get('window');

const data = [
    {
        value: "Số CV, ngày ban hành",
        label: "Số CV, ngày ban hành"
    },
    {
        value: "Đơn vị",
        label: "Đơn vị ban hành"
    },
    {
        value: "Rà soát, nghiên cứu, thực hiện theo quyết định ngày...",
        label: "Trích yếu nội dung"
    },
    {
        value: "Người nhận",
        label: "Người nhận"
    },
    {
        value: "Ngày nhận",
        label: "Ngày nhận"
    },
    {
        value: "Trạng thái",
        label: "Trạng thái"
    },
    {
        value: "Đính kèm",
        label: "Đính kèm"
    },
]

function CardOfficialDispatch() {
    const colors = useColor()

    const [isShowDes, setIsShowDes] = useState(false)

    const toogleShowDes = () => {
        setIsShowDes(!isShowDes)
    }

    return (
        <View style={styles.root}>
            <TouchableOpacityUi onPress={toogleShowDes}>
                <CardUi style={styles.card}>
                    {
                        data.map((d, index) => (
                            <Row key={index}>
                                <TextUi style={[styles.text, { color: colors.textNeutral }]}>
                                    {d.label}
                                </TextUi>
                                <TextUi style={styles.text} numberOfLines={3}>
                                    {d.value}
                                </TextUi>
                            </Row>
                        ))
                    }
                </CardUi>
            </TouchableOpacityUi>

            <BottomSheet
                isModalVisible={isShowDes}
                setModalVisible={setIsShowDes}
            >
                <View>
                    <TitleUi style={{fontSize: 18}}>Trích yếu nội dung</TitleUi>
                    <SpaceUi height={12}/>
                    <TextUi>
                        Rà soát, nghiên cứu, thực hiện theo quyết định ngày .... rà soát nghiên cứu liên quan đến quyết định ban hành yêu cầu kỹ thuật chi tiết về thử nghiệm giám sát thực hiện các công trình nguồn.
                    </TextUi>
                    <SpaceUi height={40}/>

                    <ButtonUi
                        text="Đóng"
                        onPress={toogleShowDes}
                    />
                </View>
            </BottomSheet>
        </View>
    )
}

export default CardOfficialDispatch

const styles = StyleSheet.create({
    root: {

    },
    text: {
        width: (width - PADDING_PAGE * 2 - 32) / 2
    },
    card: {
        gap: 8
    }
})