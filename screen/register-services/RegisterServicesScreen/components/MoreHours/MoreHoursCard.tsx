import RowValueLable from "@/components/commons/RowValueLable";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import Tag from "@/components/ui/Tag";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

const data = [
    {
        label: "Trạng thái",
        value: <Tag type="error" text="Chờ duyệt" />
    },
    {
        label: "Phòng ban",
        value: "Nhân sự"
    },
    {
        label: "Loại hình",
        value: "Làm online"
    },
    {
        label: "Ngày tạo",
        value: "12/09/2025"
    },
    {
        label: "Nội dung công việc",
        value: "Đăng ký làm online"
    },
    {
        label: "Thời gian",
        value: `26/11/2025 (8:00 - 17:00)\n27/11/2025 (8:00 - 17:00)`
    },
    {
        label: "Tổng số giờ",
        value: "16"
    },
];


function MoreHoursCard() {
    const color = useColor()
    const router = useRouter()
    
    const goDetail = () => {
        router.push("/register-services/more-hours-detail")
    }

    return (
        <TouchableOpacityUi onPress={goDetail}>
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
        </TouchableOpacityUi>
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

export default MoreHoursCard