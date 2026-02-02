import RowValueLable from "@/components/commons/RowValueLable";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import LineUi from "@/components/ui/LineUi";
import RowUi from "@/components/ui/Row";
import SpaceUi from "@/components/ui/SpaceUi";
import Tag from "@/components/ui/Tag";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet, View } from "react-native";
import ApprovalHistory from "../components/ApprovalHistory";
import TableTime from "../components/TableTime";


function MoreHoursScreen() {

    return (
        <ScrollView contentContainerStyle={styles.root}>
            <RowUi>
                <TitleUi>01/2025/CV-BTGD</TitleUi>
                <Tag type="error" text="Chờ duyệt" />
            </RowUi>

            <CardUi>
                <View style={{ gap: 8 }}>
                    <RowValueLable
                        label={"Đơn vị"}
                        value={"Bitexco Power"}
                    />
                    <RowValueLable
                        label={"Phòng/Ban"}
                        value={"Ban Tổng Giám Đốc"}
                    />
                    <RowValueLable
                        label={"Trạng thái"}
                        value={"Chờ phê duyệt"}
                    />
                    <RowValueLable
                        label={"Mã đăng ký"}
                        value={"07/2025/ĐT-HT"}
                    />
                    <RowValueLable
                        label={"Ngày đăng ký"}
                        value={"15/09/2024"}
                    />
                     <RowValueLable
                        label={"Người đăng ký"}
                        value={"Pham Van A"}
                    />
                    <RowValueLable
                        label={"Lý do vắng mặt"}
                        value={"TEST"}
                    />
                </View>

                <LineUi style={{ marginVertical: 20 }} />

                <TextUi style={styles.label}>Nội dung công việc thực hiện:</TextUi>
                <TextUi style={[styles.label, { color: "#EE5D0A" }]}>TEST</TextUi>

                <SpaceUi height={16} />

                <TextUi style={styles.label}>Thời gian đăng ký:</TextUi>
                <TextUi style={[styles.label, { color: "#EE5D0A" }]}>16 (giờ)</TextUi>


                <SpaceUi height={20} />

                <TableTime />

                <SpaceUi height={20} />

                <TextUi style={styles.label}>Hồ sơ đính kèm:</TextUi>
                <TextUi>Phiếu đăng ký: Đăng ký thêm giờ</TextUi>

                <SpaceUi height={20} />

                <TextInputUi
                    placeholder="Nội dung phê duyệt"
                    multiline
                    height={150}
                />

                <SpaceUi height={20} />

                <RowUi>
                    <ButtonUi
                        type="success"
                        text="Phê duyệt"
                        style={{flex: 1}}
                    />
                    <ButtonUi
                        type="error"
                        text="Từ chối"
                        style={{flex: 1}}
                    />
                </RowUi>

                <SpaceUi height={40} />
                <TitleUi>Lịch sử phê duyệt</TitleUi>
                <View>
                    {
                        [1, 2, 3, 4].map((_i, index) => 
                            <ApprovalHistory key={index}/>
                        )
                    }
                </View>
            </CardUi>
        </ScrollView>
    )
}

export default MoreHoursScreen;

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        gap: 12
    },
    label: {
        fontWeight: "600"
    },
})
