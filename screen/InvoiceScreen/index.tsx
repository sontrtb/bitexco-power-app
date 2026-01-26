import useTheme from '@/hooks/useColor';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import InvoiceList from './components/InvoiceList';

const renderScene = SceneMap({
    first: InvoiceList,
    second: InvoiceList,
});

const routes = [
    { key: 'first', title: 'Chưa thanh toán' },
    { key: 'second', title: 'Đã thanh toán' },
];

function InvoiceScreen() {
    const layout = useWindowDimensions();
    const colors = useTheme();

    const [index, setIndex] = React.useState(0);

    return (
        // <TabView
        //     navigationState={{ index, routes }}
        //     renderScene={renderScene}
        //     onIndexChange={setIndex}
        //     initialLayout={{ width: layout.width }}
        //     renderTabBar={(props) => (
        //         <TabBar
        //             {...props}
        //             style={{ backgroundColor: 'white' }}
        //             indicatorStyle={{ backgroundColor: colors.primary, height: 3 }}
        //             activeColor={colors.primary}
        //             inactiveColor={colors.text}
        //         // labelStyle={{ fontWeight: '600' }}
        //         />
        //     )}
        // />
        <InvoiceList />
    );
}

export default InvoiceScreen;