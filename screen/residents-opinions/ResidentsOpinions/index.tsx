import ButtonUi from '@/components/ui/ButtonUi';
import useTheme from '@/hooks/useColor';
import { PADDING_PAGE } from '@/theme/layout';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import ResidentsOpinionsList from './components/ResidentsOpinionsList';

const renderScene = SceneMap({
    0: () => ResidentsOpinionsList({status: undefined}),
    1: () => ResidentsOpinionsList({status: 1}),
    2: () => ResidentsOpinionsList({status: 2}),
    3: () => ResidentsOpinionsList({status: 3}),
});

const routes = [
    { key: '0', title: 'Tất cả' },
    { key: '1', title: 'Chờ phản hồi' },
    { key: '2', title: 'Đã phản hồi' },
    { key: '3', title: 'Đã xác nhận' },
];

function ResidentsOpinions() {
    const layout = useWindowDimensions();
    const colors = useTheme();

    const router = useRouter()

    const [index, setIndex] = React.useState(0);

    const onCreate = () => {
        router.navigate("/residents-opinions/create")
    }

    return (
        <View style={[styles.root, {backgroundColor: colors.bg}]}>
            <TabView
                lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        scrollEnabled
                        style={{ backgroundColor: colors.bg }}
                        indicatorStyle={{ backgroundColor: colors.primary, height: 3 }}
                        activeColor={colors.primary}
                        inactiveColor={colors.text}
                    />
                )}
            />
            <View style={styles.footer}>
                <ButtonUi
                    text='Tạo mới'
                    onPress={onCreate}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    footer: {
        paddingHorizontal: PADDING_PAGE,
        paddingBottom: PADDING_PAGE * 2
    }
})

export default ResidentsOpinions;