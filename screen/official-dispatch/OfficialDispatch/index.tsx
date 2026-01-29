import HeaderBottomTab from "@/components/commons/HeaderBottomTab";
import ButtonSelectUi from "@/components/ui/ButtonSelectUi";
import SearchInputUi from "@/components/ui/SearchInputUi";
import SpaceUi from "@/components/ui/SpaceUi";
import { PADDING_PAGE } from "@/theme/layout";
import { useRouter } from "expo-router";
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
    const router = useRouter()

    const [tabSelected, setTabSelected] = useState({
        value: "in",
        label: "Công văn đến"
    })

    const [showFilter, setShowFilter] = useState(false)

    return (
        <View style={styles.root}>
            <HeaderBottomTab title={`Công văn\ncủa bạn!`} />

            <View style={styles.content}>
                <ButtonSelectUi
                    listTab={listTab}
                    tabSelected={tabSelected}
                    setTabSelected={setTabSelected}
                />

                <SearchInputUi 
                    onFilter={() => {setShowFilter(true)}}
                    onAdd={() => {router.push("/official-dispatch-create")}}
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
})