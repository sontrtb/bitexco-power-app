import CardCategory from "@/components/commons/CardCategory";
import Row from "@/components/ui/Row";
import SearchInputUi from "@/components/ui/SearchInputUi";
import SpaceUi from "@/components/ui/SpaceUi";
import { PADDING_PAGE } from "@/theme/layout";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import MoreHoursCard from "./MoreHoursCard";

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

function MoreHours() {    
    return (
        <View style={styles.root}>
            <FlatList
                style={{ flex: 1 }}
                ListHeaderComponent={<View style={{ gap: PADDING_PAGE, paddingBottom: PADDING_PAGE }}>
                    <Row>
                        <View style={styles.column}>
                            <CardCategory
                                color="#97B1CB"
                                type="left"
                                text="Tổng"
                                count={0}
                            />
                            <CardCategory
                                color="#60C486"
                                type="bottom"
                                height={165} text={"Đang phê duyệt"} count={0} />
                            <CardCategory color="#C4C460" type="left" text={"Tạm dừng"} count={0} />
                        </View>
                        <View style={styles.column}>
                            <CardCategory color="#F0A424" type="top" height={130} text={"Chờ phê duyệt"} count={0} />
                            <CardCategory color="#C58D8E" type="right" text={"Đã phê duyệt"} count={0} />
                            <CardCategory color="#C5B0D4" type="bottom" height={135} text={"Từ chối"} count={0} />
                        </View>
                    </Row>

                    <SearchInputUi />
                </View>}
                contentContainerStyle={styles.list}
                data={DATA}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <MoreHoursCard />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <SpaceUi height={12} />}
            />
        </View>
    )
}

export default MoreHours

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    content: {
        gap: PADDING_PAGE,
        padding: PADDING_PAGE,
        flex: 1
    },
    column: {
        flex: 1,
        gap: PADDING_PAGE
    },
    list: {
        flexGrow: 1,
        paddingBottom: Platform.OS === "android" ? 130 : 20,
    },
})
