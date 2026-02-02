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
        label: "Phòng họp",
        value: "Phòng họp nhỏ"
    },
    {
        label: "Người đăng ký",
        value: "Nguyễn Văn B"
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
        label: "Nội dung",
        value: "Họp bàn phương án triển khai..."
    },
    {
        label: "Người tham gia",
        value: "Nguyễn Văn A, Trần Thi B"
    },
];


function MeetingRoomCard() {
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

export default MeetingRoomCard