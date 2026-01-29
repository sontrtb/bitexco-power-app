import CardCategory from "@/components/commons/CardCategory";
import HeaderBottomTab from "@/components/commons/HeaderBottomTab";
import ButtonSelectUi from "@/components/ui/ButtonSelectUi";
import Row from "@/components/ui/Row";
import SearchInputUi from "@/components/ui/SearchInputUi";
import SpaceUi from "@/components/ui/SpaceUi";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import BottomSheetFilterOfficalDispatch from "../official-dispatch/OfficialDispatch/BottomSheetFilterOfficalDispatch";
import CardOfficialDispatch from "../official-dispatch/OfficialDispatch/CardOfficialDispatch";

const listTab = [
    {
        value: "in",
        label: "Tôi phê duyệt"
    },
    {
        value: "out",
        label: "Tôi đã gửi"
    },
]

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

function PresentationScreen() {
    const [showFilter, setShowFilter] = useState(false)

    const [tabSelected, setTabSelected] = useState({
        value: "in",
        label: "Tôi phê duyệt"
    })

    return (
        <View style={styles.root}>
            <HeaderBottomTab title={`Tờ trình\ncủa bạn!`} />

            <View style={styles.content}>
                <ButtonSelectUi
                    listTab={listTab}
                    tabSelected={tabSelected}
                    setTabSelected={setTabSelected}
                />


                <FlatList
                    style={{ flex: 1 }}
                    ListHeaderComponent={<View style={{ gap: PADDING_PAGE, paddingBottom: PADDING_PAGE }}>
                        <Row>
                            <View style={styles.column}>
                                <CardCategory color="#97B1CB" type="left" />
                                <CardCategory color="#60C486" type="bottom" height={165} />
                                <CardCategory color="#C4C460" type="left" />
                            </View>
                            <View style={styles.column}>
                                <CardCategory color="#F0A424" type="top" height={130} />
                                <CardCategory color="#C58D8E" type="right" />
                                <CardCategory color="#C5B0D4" type="bottom" height={135} />
                            </View>
                        </Row>

                        <SearchInputUi onFilter={() => { setShowFilter(true) }} />
                    </View>}
                    contentContainerStyle={styles.list}
                    data={DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <CardOfficialDispatch />}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <SpaceUi height={12} />}
                />
            </View>

            <BottomSheetFilterOfficalDispatch
                isModalVisible={showFilter}
                setModalVisible={setShowFilter}
            />
        </View>
    )
}

export default PresentationScreen

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