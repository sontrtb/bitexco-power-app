import useColor from "@/hooks/useColor";
import { StyleProp, View, ViewStyle } from "react-native";

function LineUi({ style }: { style?: StyleProp<ViewStyle> }) {
    const colors = useColor()
    return (
        <View style={[{
            height: 1,
            width: "100%",
            marginVertical: 8, backgroundColor: colors.borderColor,

        }, style]} />
    )
}

export default LineUi