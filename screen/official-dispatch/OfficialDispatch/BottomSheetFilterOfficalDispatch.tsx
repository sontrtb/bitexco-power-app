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

const listUnit = [
    { value: 'HN', label: 'Hà Nội' },
    { value: 'HCM', label: 'TP. Hồ Chí Minh' },
    { value: 'DN', label: 'Đà Nẵng' },
    { value: 'HP', label: 'Hải Phòng' },
    { value: 'CT', label: 'Cần Thơ' },
    { value: 'AG', label: 'An Giang' },
    { value: 'BD', label: 'Bình Dương' },
    { value: 'BP', label: 'Bình Phước' },
    { value: 'BRVT', label: 'Bà Rịa - Vũng Tàu' },
    { value: 'DL', label: 'Đắk Lắk' },
    { value: 'GL', label: 'Gia Lai' },
    { value: 'KH', label: 'Khánh Hòa' },
    { value: 'LA', label: 'Long An' },
    { value: 'ND', label: 'Nam Định' },
    { value: 'NA', label: 'Nghệ An' },
    { value: 'QN', label: 'Quảng Ninh' },
    { value: 'QT', label: 'Quảng Trị' },
    { value: 'TH', label: 'Thanh Hóa' },
    { value: 'TB', label: 'Thái Bình' },
    { value: 'VT', label: 'Vĩnh Phúc' },
]

const listType = [
    { value: '1', label: 'CV đôn đốc' },
    { value: '2', label: 'CV hướng dẫn' },
    { value: '3', label: 'CV chỉ đạo' },
    { value: '4', label: 'CV đề nghị, yêu cầu' },
    { value: '5', label: 'CV phúc đáp' },
    { value: '6', label: 'Giấy mời' },
    { value: '7', label: 'Thư ngỏ' },
]

const listStatus = [
    { value: '1', label: 'Đang soạn' },
    { value: '2', label: 'Chờ chỉ đạo' },
    { value: '3', label: 'Chờ phân công' },
    { value: '4', label: 'Đang xử lý' },
    { value: '5', label: 'Hoàn thành' },
    { value: '6', label: 'Tạm dừng' },
]


function BottomSheetFilterOfficalDispatch(props: BottomSheetFilterOfficalDispatchProps) {
    const { isModalVisible, setModalVisible } = props;

    const [unitSelected, setUnitSelected] = useState<ITag[]>([])
    const [typeSelected, setTypeSelected] = useState<ITag[]>([])
    const [statusSelected, setStatusSelected] = useState<ITag[]>([])

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
                <SelectTag
                    tags={listUnit}
                    tagsSelected={unitSelected}
                    setTagsSelected={setUnitSelected}
                />

                <SpaceUi height={20} />

                <TitleUi>Loại công văn</TitleUi>
                <SpaceUi height={12} />
                <SelectTag
                    tags={listType}
                    tagsSelected={typeSelected}
                    setTagsSelected={setTypeSelected}
                />

                <SpaceUi height={20} />

                <TitleUi>Trạng thái</TitleUi>
                <SpaceUi height={12} />
                <SelectTag
                    tags={listStatus}
                    tagsSelected={statusSelected}
                    setTagsSelected={setStatusSelected}
                />

                <SpaceUi height={32} />

                <Row>
                    <ButtonUi
                        style={{flex: 1}}
                        text="Tìm kiếm"
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

export default BottomSheetFilterOfficalDispatch

const styles = StyleSheet.create({
    root: {

    }
})