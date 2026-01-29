import HeaderBottomTab from "@/components/commons/HeaderBottomTab";
import ButtonUi from "@/components/ui/ButtonUi";
import Row from "@/components/ui/Row";
import SearchInputUi from "@/components/ui/SearchInputUi";
import SpaceUi from "@/components/ui/SpaceUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import BottomSheetFilterOfficalDispatch from "./BottomSheetFilterOfficalDispatch";
import CardOfficialDispatch from "./CardOfficialDispatch";

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

const listTab = [
    {
        value: "in",
        label: "Công văn đến"
    },
    {
        value: "out",
        label: "Công văn đi"
    },
    {
        value: "doc",
        label: "Văn bản"
    },
]

function OfficialDispatch() {
    const colors = useColor()

    const [tabSelected, setTabSelected] = useState("in")

    const [showFilter, setShowFilter] = useState(false)

    return (
        <View style={styles.root}>
            <HeaderBottomTab title={`Công văn\ncủa bạn!`} />

            <View style={styles.content}>
                <Row>
                    {
                        listTab.map(tab => (
                            <ButtonUi
                                key={tab.value}
                                text={tab.label}
                                style={[styles.tab, tabSelected !== tab.value && {
                                    backgroundColor: colors.disable,
                                    borderColor: colors.disable,

                                }]}
                                styleText={tabSelected !== tab.value && { color: colors.textNeutral }}
                                onPress={() => setTabSelected(tab.value)}
                            />
                        ))
                    }
                </Row>

                <SearchInputUi 
                    onFilter={() => {setShowFilter(true)}}
                />

                <FlatList
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

export default OfficialDispatch

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    list: {
        flexGrow: 1,
        paddingBottom: Platform.OS === "android" ? 130 : 20,
    },
    content: {
        flex: 1,
        padding: PADDING_PAGE,
        gap: PADDING_PAGE
    },
    tab: {
        borderRadius: 12
    },
})