import CardUi from "@/components/ui/CardUi";
import { PADDING_PAGE } from "@/theme/layout";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const data = [
    { value: 15, label: 'T1' },
    { value: 30, label: 'T2' },
    { value: 26, label: 'T3' },
    { value: 40, label: 'T4' },
    { value: 15, label: 'T5' },
    { value: 30, label: 'T6' },
    { value: 26, label: 'T7' },
    { value: 40, label: 'T8' }
];

const windowWidth = Dimensions.get('window').width;

function ApplicationAwaitingApproval() {
    return (
        <CardUi
            style={styles.root}
            title="Hồ sơ của tôi - chờ phê duyệt"
        >
            <LineChart
                areaChart
                isAnimated
                animationDuration={800}
                data={data}
                color="#EE5D0A"
                dataPointsColor="#EE5D0A"
                startFillColor="#EE5D0A80"
                startOpacity={0.8}
                endFillColor="#EE5D0A00"
                endOpacity={0.3}
                xAxisThickness={0}
                yAxisThickness={0}
                xAxisLabelTexts={['T1', 'T2', 'T3', 'T4']}
                width={windowWidth - PADDING_PAGE - 90}
            />
        </CardUi>
    )
}

export default ApplicationAwaitingApproval

const styles = StyleSheet.create({
    root: {

    }
})