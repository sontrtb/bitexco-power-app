import useColor from "@/hooks/useColor";
import { StyleSheet, View } from "react-native";
import { Row, Rows, Table } from 'react-native-table-component';


function TableTime() {
    const colors = useColor()

    const dataTabel = {
        tableHead: ['Ngày', 'Từ giờ', 'Đến giờ', 'Số ngày'],
        tableData: [
            ['DD/MM/YYYY', '08:00', '17:30', '1'],
            ['DD/MM/YYYY', '08:00', '17:30', '1'],
            ['DD/MM/YYYY', '08:00', '17:30', '1'],
            ['DD/MM/YYYY', '08:00', '17:30', '1'],
        ]
    }


    return (
        <View style={styles.root}>
            <Table borderStyle={{ borderWidth: 1, borderColor: colors.borderColor }}>
                <Row data={dataTabel.tableHead} style={styles.head} textStyle={styles.textHead} />
                <Rows data={dataTabel.tableData} style={styles.data} textStyle={styles.text} />
            </Table>
        </View>
    )
}

export default TableTime

const styles = StyleSheet.create({
    root: {

    },
    // tabel
    head: { height: 44 },
    wrapper: { flexDirection: 'row' },
    data: { height: 44 },
    row: { height: 44 },
    text: {
        textAlign: 'center',
        fontSize: 12
    },
    textHead: {
        textAlign: 'center',
        fontWeight: "600"
    }
})