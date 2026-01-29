import BottomSheet from "@/components/ui/BottomSheet";
import ButtonUi from "@/components/ui/ButtonUi";
import SpaceUi from "@/components/ui/SpaceUi";
import TitleUi from "@/components/ui/Title";
import { StyleSheet, View } from "react-native";

interface BottomSheetFilterOfficalDispatchProps {
    isModalVisible: boolean,
    setModalVisible: (o: boolean) => void,
}

function BottomSheetFilterOfficalDispatch(props: BottomSheetFilterOfficalDispatchProps) {
    const { isModalVisible, setModalVisible } = props;

    const toogleShowDes = () => {
        setModalVisible(!isModalVisible)
    }

    return (
        <BottomSheet
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
        >
            <View>
                <TitleUi>Đơn vị ban hành nội bộ</TitleUi>
                <SpaceUi height={12} />
                <View>
                    
                </View>

                <ButtonUi
                    text="Đóng"
                    onPress={toogleShowDes}
                />
            </View>
        </BottomSheet>
    )
}

export default BottomSheetFilterOfficalDispatch

const styles = StyleSheet.create({
    root: {

    }
})