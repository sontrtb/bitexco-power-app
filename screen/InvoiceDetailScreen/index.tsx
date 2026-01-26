import BottomSheet from "@/components/ui/BottomSheet";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import SpaceUi from "@/components/ui/SpaceUi";
import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import useTheme from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function InvoiceDetailScreen() {
    const color = useTheme();

    const [openModalPay, setOpenModalPay] = useState(false)

    const handlePaymentConfirm = () => {
        setOpenModalPay(false)
    }

    return (
        <View style={styles.root}>
            <View>
                <TitleUi>Hóa đơn tháng 12</TitleUi>
                <SpaceUi height={PADDING_PAGE} />

                <CardUi style={styles.card}>
                    {/* Tiền điện */}
                    <Row style={styles.row}>
                        <View style={styles.leftSection}>
                            <View style={[styles.iconContainer, { backgroundColor: color.bgImage }]}>
                                <Feather name="zap" size={20} color={color.primary} />
                            </View>
                            <TextUi style={styles.label}>Tiền điện</TextUi>
                        </View>
                        <TextUi style={styles.amount}>1.000.000đ</TextUi>
                    </Row>

                    <View style={[styles.divider, { backgroundColor: color.borderColor }]} />

                    {/* Tiền nước */}
                    <Row style={styles.row}>
                        <View style={styles.leftSection}>
                            <View style={[styles.iconContainer, { backgroundColor: color.bgImage }]}>
                                <Feather name="droplet" size={20} color={color.primary} />
                            </View>
                            <TextUi style={styles.label}>Tiền nước</TextUi>
                        </View>
                        <TextUi style={styles.amount}>500.000đ</TextUi>
                    </Row>

                    <View style={[styles.divider, { backgroundColor: color.borderColor }]} />

                    {/* Tiền internet */}
                    <Row style={styles.row}>
                        <View style={styles.leftSection}>
                            <View style={[styles.iconContainer, { backgroundColor: color.bgImage }]}>
                                <Feather name="wifi" size={20} color={color.primary} />
                            </View>
                            <TextUi style={styles.label}>Tiền internet</TextUi>
                        </View>
                        <TextUi style={styles.amount}>300.000đ</TextUi>
                    </Row>

                    <View style={[styles.divider, { backgroundColor: color.borderColor }]} />

                    {/* Phí dịch vụ */}
                    <Row style={styles.row}>
                        <View style={styles.leftSection}>
                            <View style={[styles.iconContainer, { backgroundColor: color.bgImage }]}>
                                <Feather name="home" size={20} color={color.primary} />
                            </View>
                            <TextUi style={styles.label}>Phí dịch vụ</TextUi>
                        </View>
                        <TextUi style={styles.amount}>200.000đ</TextUi>
                    </Row>

                    <View style={[styles.divider, { backgroundColor: color.borderColor }]} />

                    {/* Phí xe */}
                    <Row style={styles.row}>
                        <View style={styles.leftSection}>
                            <View style={[styles.iconContainer, { backgroundColor: color.bgImage }]}>
                                <Feather name="truck" size={20} color={color.primary} />
                            </View>
                            <TextUi style={styles.label}>Phí gửi xe</TextUi>
                        </View>
                        <TextUi style={styles.amount}>150.000đ</TextUi>
                    </Row>
                    
                    <SpaceUi height={8}/>
                    <View style={[styles.totalDivider, { backgroundColor: color.primary }]} />
                    <SpaceUi height={12}/>

                    {/* Tổng cộng */}
                    <Row>
                        <TextUi style={[styles.totalLabel, { color: color.primary }]}>
                            Tổng cộng
                        </TextUi>
                        <TextUi style={[styles.totalAmount, { color: color.primary }]}>
                            2.150.000đ
                        </TextUi>
                    </Row>
                </CardUi>
            </View>

            <ButtonUi
                text="Thanh toán"
                onPress={() => setOpenModalPay(true)}
            />

            <BottomSheet
                isModalVisible={openModalPay}
                setModalVisible={setOpenModalPay}
            >
                <View style={styles.bottomPayment}>
                    <Row>
                        <TextUi style={[styles.totalLabel, { color: color.primary }]}>
                            Tổng cộng
                        </TextUi>
                        <TextUi style={[styles.totalAmount, { color: color.primary }]}>
                            2.150.000đ
                        </TextUi>
                    </Row>
                    <View style={[styles.totalDivider, { backgroundColor: color.primary }]} />
                    <TextUi>Quét mã QR thanh toán</TextUi>
                    <ImageUi
                        source={{
                            uri: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                        }}
                        style={styles.qrCode}
                    />
                    <ButtonUi
                        text="Xác nhận đã chuyển khoản"
                        onPress={handlePaymentConfirm}
                    />
                </View>
            </BottomSheet>
        </View>
    );
}

export default InvoiceDetailScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: PADDING_PAGE,
        paddingBottom: PADDING_PAGE * 2,
        justifyContent: "space-between",
    },
    card: {
        gap: 0,
        padding: 16,
    },
    row: {
        paddingVertical: 12,
        alignItems: "center",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 15,
    },
    amount: {
        fontSize: 15,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        width: "100%",
    },
    totalDivider: {
        height: 2,
        width: "100%",
    },
    totalLabel: {
        fontSize: 17,
        fontWeight: "700",
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: "700",
    },

    //
    bottomPayment: {
        alignItems: "center",
        gap: 12
    },
    qrCode: {
        width: windowWidth / 2,
        height: windowWidth / 2,
        marginBottom: 20,
        borderRadius: 8,
        padding: 8
    }
});