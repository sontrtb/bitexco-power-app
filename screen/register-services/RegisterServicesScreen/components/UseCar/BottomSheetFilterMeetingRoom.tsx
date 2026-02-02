import SelectTag, { ITag } from "@/components/commons/SelectTag";
import BottomSheet from "@/components/ui/BottomSheet";
import ButtonUi from "@/components/ui/ButtonUi";
import Row from "@/components/ui/Row";
import SpaceUi from "@/components/ui/SpaceUi";
import TitleUi from "@/components/ui/Title";
import { useState } from "react";
import { View } from "react-native";

interface BottomSheetFilterOfficalDispatchProps {
    isModalVisible: boolean,
    setModalVisible: (o: boolean) => void,
}

const listType = [
    { value: '1', label: 'Phòng họp lớn',},
    { value: '2', label: 'Phòng họp nhỏ_01' },
    { value: '3', label: 'Phòng họp nhỏ_02' },
]

const listStatus = [
    { value: '1', label: 'Chờ phê duyệt',},
    { value: '2', label: 'Đã phê duyệt' },
    { value: '3', label: 'Từ chối' },
]

function BottomSheetFilterMeetingRoom(props: BottomSheetFilterOfficalDispatchProps) {
    const { isModalVisible, setModalVisible } = props;

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
                <TitleUi>Loại phòng họp</TitleUi>
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

export default BottomSheetFilterMeetingRoom
