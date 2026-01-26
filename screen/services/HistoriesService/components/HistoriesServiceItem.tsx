import { IServiceHistory } from "@/api/services";
import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import { paymentMethod } from "@/configs/payment";
import useColor from "@/hooks/useColor";
import { dateFormat } from "@/lib/date";
import { formatPrice } from "@/lib/price";
import { PADDING_PAGE } from "@/theme/layout";
import { Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import moment from "moment";
import { StyleSheet, View } from "react-native";

function HistoriesServiceItem({ item }: { item: IServiceHistory }) {
    const color = useColor();
    const isPast = false;

    return (
        <CardUi style={[styles.card, isPast && styles.pastCard]}>
            {/* Status Badge */}
            {isPast && (
                <View style={[styles.badge, { backgroundColor: color.disable }]}>
                    <MaterialCommunityIcons name="check-circle" size={12} color="#fff" />
                    <TextUi style={styles.badgeText}>Đã sử dụng</TextUi>
                </View>
            )}

            <View style={styles.container}>
                {/* Customer Info Section */}
                <View style={styles.section}>
                    <Row style={styles.row}>
                        <View style={[styles.smallIconWrapper, { backgroundColor: color.bgImage }]}>
                            <Feather name="user" size={14} color={color.primary} />
                        </View>
                        <TextUi style={styles.label}>Khách hàng:</TextUi>
                        <TextUi weight="medium">{item.residentName}</TextUi>
                    </Row>

                    <Row style={styles.row}>
                        <View style={[styles.smallIconWrapper, { backgroundColor: color.bgImage }]}>
                            <Feather name="phone" size={14} color={color.primary} />
                        </View>
                        <TextUi style={styles.label}>SĐT:</TextUi>
                        <TextUi weight="medium">{item.phoneNumber}</TextUi>
                    </Row>

                    {item.note && (
                        <Row style={[styles.row, styles.noteRow]}>
                            <View style={[styles.smallIconWrapper, { backgroundColor: color.bgImage }]}>
                                <MaterialCommunityIcons
                                    name="notebook-outline"
                                    size={14}
                                    color={color.primary}
                                />
                            </View>
                            <TextUi style={styles.label}>Ghi chú:</TextUi>
                            <TextUi
                                style={styles.noteText}
                                numberOfLines={2}
                            >
                                {item.note}
                            </TextUi>
                        </Row>
                    )}
                </View>

                {/* Service Details Section */}
                {item.details && item.details.length > 0 && (
                    <>
                        <View style={[styles.divider, { backgroundColor: color.borderColor }]} />
                        <View style={styles.sectionDetails}>
                            <Row style={styles.sectionHeader}>
                                <MaterialCommunityIcons
                                    name="clipboard-list-outline"
                                    size={16}
                                    color={color.primary}
                                />
                                <TextUi style={{ color: color.primary }}>
                                    Chi tiết dịch vụ
                                </TextUi>
                            </Row>

                            {item.details.map((d, index) => (
                                <View key={d.id} style={styles.serviceDetail}>
                                    <View style={styles.serviceCard}>
                                        <Row style={styles.serviceRow}>
                                            <MaterialCommunityIcons
                                                name="spa"
                                                size={16}
                                                color={color.primary}
                                            />
                                            <TextUi weight="semiBold" style={{ color: color.primary, flex: 1 }}>
                                                {d.utilityServiceName}
                                            </TextUi>
                                        </Row>

                                        <Row style={styles.serviceRow}>
                                            <MaterialCommunityIcons
                                                name="package-variant"
                                                size={14}
                                                color={color.primary}
                                            />
                                            <TextUi>
                                                {d.utilityPackageName}
                                            </TextUi>
                                        </Row>

                                        <Row style={styles.serviceRow}>
                                            <Octicons
                                                name="number"
                                                size={14}
                                                color={color.primary}
                                            />
                                            <TextUi>
                                                {d.quantity}
                                            </TextUi>
                                        </Row>

                                        <Row style={styles.serviceRow}>
                                            <Feather
                                                name="calendar"
                                                size={14}
                                                color={color.primary}
                                            />
                                            <TextUi>
                                                {dateFormat(moment(d.registrationDate))}
                                            </TextUi>
                                        </Row>

                                        <Row style={styles.serviceRow}>
                                            <Feather
                                                name="clock"
                                                size={14}
                                                color={color.primary}
                                            />
                                            <TextUi>
                                                {d.timeStart} - {d.timeEnd}
                                            </TextUi>
                                        </Row>
                                    </View>
                                    {index < (item.details?.length ?? 0) - 1 && (
                                        <View style={styles.serviceGap} />
                                    )}
                                </View>
                            ))}
                        </View>
                    </>
                )}

                {/* Total Amount Section */}
                <View style={[styles.divider, { backgroundColor: color.borderColor }]} />

                <View style={[styles.totalSection,]}>
                    <Row style={styles.totalRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: color.primary }]}>
                            <Feather name="dollar-sign" size={20} color="#fff" />
                        </View>
                        <View style={styles.totalInfo}>
                            <TextUi style={styles.totalLabel}>Thanh toán: {paymentMethod.find(p => p.value === item.paymentMethod)?.label}</TextUi>
                            <TextUi weight="bold" style={[styles.price, { color: color.primary }]}>
                                {formatPrice(item.totalAmount)}
                            </TextUi>
                        </View>
                    </Row>
                </View>
            </View>
        </CardUi>
    );
}

export default HistoriesServiceItem;

const styles = StyleSheet.create({
    card: {
        marginBottom: PADDING_PAGE,
        overflow: 'hidden',
    },
    sectionDetails: {
        paddingVertical: 8
    },
    pastCard: {
        opacity: 0.6,
    },
    container: {
        gap: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerInfo: {
        marginLeft: 12,
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 12,
    },
    section: {
        paddingVertical: 12,
        gap: 8
    },
    sectionHeader: {
        justifyContent: 'flex-start',
        marginBottom: 4,
    },
    row: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    noteRow: {
        alignItems: 'flex-start',
    },
    smallIconWrapper: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    label: {
        fontSize: 13,
        marginRight: 6,
        opacity: 0.7,
    },
    noteText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
    },
    divider: {
        width: '100%',
        height: 1,
    },
    serviceDetail: {
        marginTop: 8,
    },
    serviceCard: {
        padding: 12,
        borderRadius: 8,
        gap: 8,
    },
    serviceRow: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    serviceGap: {
        height: 8,
    },
    totalSection: {
        borderRadius: 8,
        marginTop: 12,
    },
    totalRow: {
        justifyContent: 'flex-start',
    },
    totalInfo: {
        flex: 1,
    },
    totalLabel: {
        marginBottom: 2,
        opacity: 0.7,
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
    },
    badge: {
        position: 'absolute',
        top: 12,
        right: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        zIndex: 1,
    },
    badgeText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '600',
    },
});