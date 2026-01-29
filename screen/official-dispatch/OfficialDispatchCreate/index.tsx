import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import FormOfficialDispatch from "./components/FormOfficialDispatch";

const renderScene = SceneMap({
    first: () => <FormOfficialDispatch />,
    second: () => <FormOfficialDispatch />,
});

const routes = [
    { key: 'first', title: 'Nội bộ' },
    { key: 'second', title: 'Bên ngoài' },
];

function OfficialDispatchCreate() {
    const [index, setIndex] = useState(0);
    const layout = useWindowDimensions();

    const colors = useColor()
    
    return (
        <View style={styles.root}>
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
        </View>
    )
}

export default OfficialDispatchCreate

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
})