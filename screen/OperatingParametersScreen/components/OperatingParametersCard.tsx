import CardUi from "@/components/ui/CardUi";
import { PADDING_PAGE } from "@/theme/layout";
import { Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const windowWidth = Dimensions.get('window').width;

function OperatingParametersCard() {
    const barData = [{value: 15}, {value: 30}, {value: 26}, {value: 40}];

    return (
        <CardUi style={styles.root} title="Thông số vận hành">
            <BarChart
                showGradient
                gradientColor="#EE5D0A66"
                frontColor="#EE5D0A"
                data={barData}
                width={windowWidth - PADDING_PAGE * 2 - 90}
                height={250}
                barWidth={36}
                spacing={36}
                // yAxisTextStyle={styles.yAxisText}
                // xAxisLabelTextStyle={{ ...styles.xAxisText, backgroundColor: color.bgImage, color: color.primary }}
                isAnimated
                barBorderTopLeftRadius={4}
                barBorderTopRightRadius={4}
                animationDuration={800}
            />
        </CardUi>
    )
}

export default OperatingParametersCard

const styles = StyleSheet.create({
    root: {
        
    }
})
