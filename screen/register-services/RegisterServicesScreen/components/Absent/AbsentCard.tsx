import RowValueLable from "@/components/commons/RowValueLable";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { StyleSheet, View } from "react-native";


const data = [
    {
        value: "Trạng thái",
        label: "Chờ duyệt"
    },
    {
        value: "Phòng ban",
        label: "Nhân sự"
    },
    {
        value: "Loại hình",
        label: "Làm online"
    },
    {
        value: "Ngày tạo",
        label: "12/09/2025"
    },
    {
        value: "Lý do",
        label: "Đăng ký làm online"
    },
]

function AbsentCard() {
    const color = useColor()
    
    const goDetail = () => {

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

export default AbsentCard