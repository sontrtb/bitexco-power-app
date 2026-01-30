import HeaderBottomTab from "@/components/commons/HeaderBottomTab";
import ButtonSelectUi from "@/components/ui/ButtonSelectUi";
import SelectOptionUi, { IOption } from "@/components/ui/SelectOptionUi";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Absent from "./components/Absent";
import MeetingRoom from "./components/MeetingRoom";
import MoreHours from "./components/MoreHours";
import UseCar from "./components/UseCar";

const listTab = [
    {
        value: "in",
        label: "Tôi phê duyệt"
    },
    {
        value: "out",
        label: "Tôi đã gửi"
    },
]

const selectType: IOption[] = [
    {
        value: "1",
        label: "Vắng mặt"
    },
    {
        value: "2",
        label: "Thêm giờ"
    },
    {
        value: "3",
        label: "Phòng họp"
    },
    {
        value: "4",
        label: "Sử dụng xe"
    },
]

const renderContent = (type: string) => {
    if (type === "1") {
        return <Absent />
    } else if (type === "2") {
        return <MoreHours />
    } else if (type === "3") {
        return <MeetingRoom />
    } else if (type === "4") {
        return <UseCar />
    }
}

function RegisterServicesScreen() {
    const [tabSelected, setTabSelected] = useState(listTab[0])

    const [type, setType] = useState(selectType[0])



    return (
        <View style={styles.root}>
            <HeaderBottomTab title={`Đăng ký`} />

            <View style={styles.content}>
                <ButtonSelectUi
                    listTab={listTab}
                    tabSelected={tabSelected}
                    setTabSelected={setTabSelected}
                />

                <SelectOptionUi
                    options={selectType}
                    value={type}
                    onChange={(v) => setType(v)}
                />

                {renderContent(type.value.toString())}
            </View>
        </View>
    )
}

export default RegisterServicesScreen

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    content: {
        gap: PADDING_PAGE,
        padding: PADDING_PAGE,
        flex: 1
    },
    column: {
        flex: 1,
        gap: PADDING_PAGE
    },
    list: {
        flexGrow: 1,
        paddingBottom: Platform.OS === "android" ? 130 : 20,
    },
})