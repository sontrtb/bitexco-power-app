import SelectTag, { ITag } from "@/components/commons/SelectTag";
import BottomSheet from "@/components/ui/BottomSheet";
import ButtonUi from "@/components/ui/ButtonUi";
import Row from "@/components/ui/Row";
import SpaceUi from "@/components/ui/SpaceUi";
import TitleUi from "@/components/ui/Title";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

interface BottomSheetFilterOfficalDispatchProps {
    isModalVisible: boolean,
    setModalVisible: (o: boolean) => void,
}

const listType = [
    { value: '1', label: 'Công tác',},
    { value: '2', label: 'Giải trình chấm công' },
    { value: '3', label: 'Làm việc online' },
    { value: '4', label: 'Nghỉ bù' },
    { value: '5', label: 'Nghỉ chế độ' },
    { value: '6', label: 'Làm việc online' },
]

function BottomSheetFilterAbsent(props: BottomSheetFilterOfficalDispatchProps) {
    const { isModalVisible, setModalVisible } = props;

    const [typeSelected, setTypeSelected] = useState<ITag[]>([])

    const toogleShowDes = () => {
        setModalVisible(!isModalVisible)
    }

    return (
        <BottomSheet
            isModalVisible={isModalVisible}
            setModalVisible={setModalVisible}
        >
            <View>
                <TitleUi>Hình thức vắng mặt</TitleUi>
                <SpaceUi height={12} />
                <SelectTag
                    tags={listType}
                    tagsSelected={typeSelected}
                    setTagsSelected={setTypeSelected}
                />

                <SpaceUi height={32} />

                <Row>
                    <ButtonUi
                        style={{flex: 1}}
                        text="Chọn"
                        onPress={toogleShowDes}
                    />
                    <ButtonUi
                        style={{flex: 1}}
                        type="outline"
                        text="Đóng"
                        onPress={toogleShowDes}
                    />
                </Row>

            </View>
        </BottomSheet>
    )
}

export default BottomSheetFilterAbsent

const styles = StyleSheet.create({
    root: {

    }
})