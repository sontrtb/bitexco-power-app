import BottomSheetAction from "@/components/ui/BottomSheetAction";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { useApartment } from "@/stores/useApartments";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from "react";
import { StyleSheet, View } from "react-native";

function AddressCard() {
    const { setApartmentSelect, apartments, apartmentSelect } = useApartment()

    const color = useColor()

    const [openChange, setOpenChange] = useState(false)

    const list = apartments?.map(d => ({
        text: d.apartmentCode,
        subText: d.domainName,
        onPress: () => {
            setOpenChange(false)
            setApartmentSelect(d)
        }
    }))

    return (
        <CardUi style={styles.root}>
            <View>
                <TextUi style={styles.room}>{apartmentSelect?.apartmentCode}</TextUi>
                <Row style={{ justifyContent: "flex-start", gap: 2 }}>
                    <MaterialIcons name="location-pin" size={16} color={color.text} />
                    <TextUi style={styles.building}>{apartmentSelect?.domainName}</TextUi>
                </Row>
            </View>
            <ButtonUi
                text="Thay đổi"
                style={{ height: 32 }}
                onPress={() => setOpenChange(true)}
            />

            <BottomSheetAction
                isModalVisible={openChange}
                setModalVisible={setOpenChange}
                actions={list ?? []}
            />
        </CardUi>
    )
}

export default AddressCard

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    building: {
        fontSize: 12
    },
    room: {
        fontWeight: "500",
        fontSize: 18,
        marginBottom: 4
    }
})