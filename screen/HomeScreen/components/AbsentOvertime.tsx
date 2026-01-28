import CardUi from "@/components/ui/CardUi";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import { StyleSheet, View } from "react-native";

function AbsentOvertime() {
    return (
        <View style={styles.root}>
            <CardUi>
                <SelectOptionUi options={[]}                
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
