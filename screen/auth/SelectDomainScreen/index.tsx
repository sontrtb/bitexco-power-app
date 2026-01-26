import { getUserAccess } from "@/api/auth";
import AuthLayout from "@/components/commons/AuthLayout";
import ButtonUi from "@/components/ui/ButtonUi";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import TextUi from "@/components/ui/TextUi";
import useTheme from "@/hooks/useColor";
import { ApartmentStore, useApartment } from '@/stores/useApartments';
import { useAuth } from "@/stores/useAuth";
import { PADDING_PAGE } from "@/theme/layout";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

function SelectDomainScreen() {
    const color = useTheme()

    const { clearUser } = useAuth()
    const { setApartmentSelect, setApartments } = useApartment()

    const [apartmentDraf, setApartmentDraf] = useState<ApartmentStore>()

    const getUserAccessQuery = useQuery({
        queryFn: getUserAccess,
        queryKey: ["getUserAccess"]
    })
    const apartments = getUserAccessQuery.data?.data.apartments
    const list = apartments?.map(d => ({
        label: d.apartmentCode,
        subLabel: d.domainName,
        value: d.apartmentId
    }))

    useEffect(() => {
        if (apartments && apartments.length === 1) {
            setApartmentSelect(apartments[0])
        }
    }, [apartments, setApartmentSelect])

    useEffect(() => {
        setApartments(apartments ?? []);
    }, [apartments, setApartments])


    const onConfirm = async () => {
        if (apartmentDraf)
            setApartmentSelect(apartmentDraf)
    }

    return (
        <LoadingScreen isLoading={getUserAccessQuery.isLoading}>
            <AuthLayout
                backAction={clearUser}
            >
                <View style={styles.root}>
                    <View>
                        <TextUi allowFontScaling={false} style={[styles.title, { color: color.primary }]}>Chọn căn hộ</TextUi>
                        <View style={[styles.diriver, { backgroundColor: color.primary }]} />
                        <View style={styles.card}>
                            <SelectOptionUi
                                label="Chọn căn hộ"
                                placeholder="Căn hộ ..."
                                options={list ?? []}
                                onChange={(v) => {
                                    const aSelected = apartments?.find(a => a.apartmentId === v.value)
                                    if (aSelected) {
                                        setApartmentDraf(aSelected)
                                    }
                                }}
                            />
                        </View>
                    </View>

                    <ButtonUi
                        disable={!apartmentDraf}
                        text="Xác nhận"
                        style={styles.buttonLogin}
                        onPress={onConfirm}
                    />
                </View>
            </AuthLayout>
        </LoadingScreen>
    )
}

export default SelectDomainScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: PADDING_PAGE,
    },
    title: {
        fontSize: 24,
        fontWeight: "600"
    },
    card: {
        gap: 24,
        marginTop: 28,
        width: "100%"
    },
    buttonLogin: {
        marginTop: 20,
        borderRadius: 22
    },
    diriver: {
        width: 80,
        height: 2,
        marginBottom: 8,
        marginTop: 8
    },
    logo: {
        height: 60,
        width: 170,
        objectFit: "scale-down"
    }
})
