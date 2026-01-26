import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import Tag from "@/components/ui/Tag";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useTheme from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useRouter } from "expo-router";
import { SectionList, StyleSheet, View } from "react-native";

type InvoiceStatus = 'paid' | 'unpaid' | 'pending';

interface Invoice {
    id: number;
    month: number;
    year: number;
    totalAmount: number;
    remainingAmount: number;
    status: InvoiceStatus;
}

interface InvoiceSection {
    year: number;
    data: Invoice[];
}

const getStatusInfo = (status: InvoiceStatus) => {
    switch (status) {
        case 'paid':
            return { text: 'Đã thanh toán', color: '#10b981' };
        case 'unpaid':
            return { text: 'Chưa thanh toán', color: '#ef4444' };
        case 'pending':
            return { text: 'Chờ xác nhận', color: '#f59e0b' };
    }
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);
};

const Item = ({ invoice }: { invoice: Invoice }) => {
    const statusInfo = getStatusInfo(invoice.status);

    const color = useTheme()

    const router = useRouter();

    return (
        <TouchableOpacityUi
            onPress={() => {
                router.push("/invoices/1")
            }}
        >
            <CardUi
                title={`Tháng ${invoice.month}/${invoice.year}`}
                style={[
                    styles.item,
                    invoice.status === "unpaid" && { backgroundColor: color.bgImage }
                ]}
            >
                <View style={styles.content}>
                    <Row>
                        <TextUi>Tổng tiền:</TextUi>
                        <TextUi style={styles.amount}>
                            {formatCurrency(invoice.totalAmount)}
                        </TextUi>
                    </Row>

                    <Row>
                        <TextUi>Còn lại:</TextUi>
                        <TextUi style={[styles.amount, styles.remaining]}>
                            {formatCurrency(invoice.remainingAmount)}
                        </TextUi>
                    </Row>
                    
                    <Tag
                        backgroundColor={statusInfo.color}
                        text={statusInfo.text}
                    />
                </View>
            </CardUi>
        </TouchableOpacityUi>
    );
};

const SectionHeader = ({ year }: { year: number }) => (
    <View style={styles.sectionHeader}>
        <TextUi style={styles.sectionHeaderText}>Năm {year}</TextUi>
    </View>
);

function InvoiceList() {
    const invoices: Invoice[] = [
        // Năm 2024
        { id: 1, month: 1, year: 2024, totalAmount: 5000000, remainingAmount: 0, status: 'paid' },
        { id: 2, month: 2, year: 2024, totalAmount: 4500000, remainingAmount: 2000000, status: 'unpaid' },
        { id: 3, month: 3, year: 2024, totalAmount: 6000000, remainingAmount: 3000000, status: 'pending' },
        { id: 4, month: 4, year: 2024, totalAmount: 5500000, remainingAmount: 0, status: 'paid' },
        { id: 5, month: 5, year: 2024, totalAmount: 4800000, remainingAmount: 4800000, status: 'unpaid' },
        { id: 6, month: 6, year: 2024, totalAmount: 5200000, remainingAmount: 1000000, status: 'pending' },
        // Năm 2023
        { id: 7, month: 10, year: 2023, totalAmount: 5300000, remainingAmount: 0, status: 'paid' },
        { id: 8, month: 11, year: 2023, totalAmount: 4900000, remainingAmount: 2500000, status: 'unpaid' },
        { id: 9, month: 12, year: 2023, totalAmount: 5100000, remainingAmount: 0, status: 'paid' },
        // Năm 2022
        { id: 10, month: 8, year: 2022, totalAmount: 5400000, remainingAmount: 5400000, status: 'pending' },
        { id: 11, month: 9, year: 2022, totalAmount: 4700000, remainingAmount: 0, status: 'paid' },
    ];

    // Nhóm hoá đơn theo năm
    const groupedInvoices: InvoiceSection[] = invoices
        .reduce((acc: InvoiceSection[], invoice) => {
            const existingSection = acc.find(section => section.year === invoice.year);
            if (existingSection) {
                existingSection.data.push(invoice);
            } else {
                acc.push({ year: invoice.year, data: [invoice] });
            }
            return acc;
        }, [])
        .sort((a, b) => b.year - a.year); // Sắp xếp năm mới nhất trước

    // Sắp xếp tháng trong mỗi năm
    groupedInvoices.forEach(section => {
        section.data.sort((a, b) => b.month - a.month);
    });

    return (
        <View style={styles.root}>
            <SectionList
                contentContainerStyle={{ paddingHorizontal: PADDING_PAGE }}
                sections={groupedInvoices}
                renderItem={({ item }) => <Item invoice={item} />}
                renderSectionHeader={({ section }) => (
                    <SectionHeader year={section.year} />
                )}
                keyExtractor={item => item.id.toString()}
                stickySectionHeadersEnabled={true}
            />
        </View>
    );
}

export default InvoiceList;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    item: {
        marginBottom: PADDING_PAGE
    },
    content: {
        gap: 12,
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    remaining: {
        color: '#ef4444',
    },
    sectionHeader: {
        backgroundColor: '#f3f4f6',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    }
});