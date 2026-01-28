import CardUi from "@/components/ui/CardUi";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import SpaceUi from "@/components/ui/SpaceUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Absent from "./Absent";
import Overtime from "./Overtime";

const renderScene = SceneMap({
    first: () => <Absent />,
    second: () => <Overtime />,
});

const routes = [
    { key: 'first', title: 'Vắng mặt' },
    { key: 'second', title: 'Thêm giờ' },
];

function AbsentOvertime() {
    const [index, setIndex] = useState(0);
    const layout = useWindowDimensions();

    const colors = useColor()

    return (
        <View style={styles.root}>
            <CardUi>
                <SelectOptionUi
                    placeholder="Bitexco Power"
                    options={[
                        {
                            value: "1",
                            label: "Bitexco Power"
                        }
                    ]}
                />

                <SpaceUi height={12}/>

                <TabView
                    style={{ height: 350 }}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width - PADDING_PAGE * 2 - 12 * 2 }}
                    renderTabBar={(props) => (
                        <TabBar
                            {...props}
                            style={{ backgroundColor: 'white' }}
                            indicatorStyle={{ backgroundColor: colors.primary, height: 3 }}
                            activeColor={colors.primary}
                            inactiveColor={colors.text}
                        />
                    )}
                />
            </CardUi>
        </View>
    )
}

export default AbsentOvertime

const styles = StyleSheet.create({
    root: {

    }
})
