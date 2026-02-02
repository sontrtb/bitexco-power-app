import SearchInputUi from "@/components/ui/SearchInputUi";
import SpaceUi from "@/components/ui/SpaceUi";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import BottomSheetFilterMeetingRoom from "./BottomSheetFilterMeetingRoom";
import UseCarCard from "./UseCarCard";

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

function UseCar() {
    const [showFilter, setShowFilter] = useState(false)
    
    return (
        <View style={styles.root}>
            <FlatList
                style={{ flex: 1 }}
                ListHeaderComponent={<View style={{ gap: PADDING_PAGE, paddingBottom: PADDING_PAGE }}>
                    <SearchInputUi onFilter={() => { setShowFilter(true) }} />
                </View>}
                contentContainerStyle={styles.list}
                data={DATA}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <UseCarCard />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <SpaceUi height={12} />}
            />

            <BottomSheetFilterMeetingRoom
                isModalVisible={showFilter}
                setModalVisible={setShowFilter}
            />
        </View>
    )
}

export default UseCar

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
