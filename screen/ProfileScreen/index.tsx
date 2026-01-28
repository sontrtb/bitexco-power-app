import { PADDING_PAGE } from "@/theme/layout";
import { ScrollView, StyleSheet, View } from "react-native";
import ApplicationAwaitingApproval from "./components/ApplicationAwaitingApproval";
import BannerProfile from "./components/BannerProfile";
import Timekeeping from "./components/Timekeeping";

function ProfileScreen() {
    return (
        <ScrollView style={styles.root}>
            <BannerProfile />
            <View style={styles.content}>
                <ApplicationAwaitingApproval />
                <Timekeeping />
            </View>
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    root: {

    },
    content: {
        padding: PADDING_PAGE,
        gap: PADDING_PAGE
    }
})
