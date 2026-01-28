import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet, View } from "react-native";
import BannerProfile from "../ProfileScreen/components/BannerProfile";
import DailyRevenueOutput from "./components/DailyRevenueOutput";
import OperatingParametersCard from "./components/OperatingParametersCard";
import RevenueOutput from "./components/RevenueOutput";

function OperatingParameters() {
    return (
        <ScrollView style={styles.root}>
            <BannerProfile />
            <View style={styles.content}>
                <OperatingParametersCard />
                <RevenueOutput />
                <DailyRevenueOutput />
            </View>
        </ScrollView>
    )
}

export default OperatingParameters

const styles = StyleSheet.create({
    root: {

    },
    content: {
        padding: PADDING_PAGE,
        gap: PADDING_PAGE
    }
})

