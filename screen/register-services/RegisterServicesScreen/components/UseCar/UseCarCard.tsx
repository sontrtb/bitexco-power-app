import RowValueLable from "@/components/commons/RowValueLable";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import Tag from "@/components/ui/Tag";
import useColor from "@/hooks/useColor";
// import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

const data = [
    {
        label: "Trạng thái",
        value: <Tag type="error" text="Chờ duyệt" />
    },
    {
        label: "Mã",
        value: "ABC-05/2025-001"
    },
    {
        label: "Loại xe",
        value: "Xe 4 chỗ"
    },
    {
        label: "Thời gian bắt đầu",
        value: "12/09/2025 11:30:00"
    },
    {
        label: "Thời gian kết thúc",
        value: "12/09/2025 12:00:00"
    },
     {
        label: "Ưu tiên sử dụng",
        value: "Công việc gấp"
    },
    {
        label: "Mục đích sử dụng",
        value: "Chở sếp đi công tác"
    },
    {
        label: "Người đăng ký",
        value: "Nguyễn Văn A"
    },
];


function UseCarCard() {
    const color = useColor()
    // const router = useRouter()
    
    // const goDetail = () => {
    //     router.push("/register-services/absent-detail")
    // }

    return (
        // <TouchableOpacityUi onPress={goDetail}>
            <CardUi style={styles.card}>
                {
                    data.map((d, index) => (
                        <RowValueLable
                            key={index}
                            value={d.value}
                            label={d.label}
                        />
                    ))
                }

                <View style={[styles.line, { backgroundColor: color.borderColor }]} />

                <Row>
                    <ButtonUi
                        text="Phê duyệt"
                        type="success"
                        style={{flex: 1}}
                    />
                    <ButtonUi
                        text="Từ chối"
                        type="error"
                        style={{flex: 1}}
                    />
                </Row>
            </CardUi>
        // </TouchableOpacityUi>
    )
}

const styles = StyleSheet.create({
    card: {
        gap: 8
    },
     line: {
        height: 1.5,
        width: "100%",
        marginVertical: 8
    },
})

export default UseCarCard