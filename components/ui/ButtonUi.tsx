import useTheme from "@/hooks/useColor";
import { ReactElement, useMemo } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import TextUi from "./TextUi";

interface ButtonUiProps {
    children?: ReactElement;
    text?: string;
    type?: "primary" | "outline" | "success" | "error";
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    isLoading?: boolean;
    disable?: boolean;
    styleText?: StyleProp<TextStyle>;
}

function ButtonUi(props: ButtonUiProps) {
    const {
        text,
        type = "primary",
        style,
        onPress,
        isLoading,
        disable,
        styleText,
        children
    } = props;

    const color = useTheme()

    const colorBtn = useMemo(() => {
        let bgColor = color.primary
        let textColor = "#fff"
        let borderColor = undefined

        switch (type) {
            case "primary":
                bgColor = color.primary
                textColor = "#fff"
                borderColor = color.primary
                break
            case "outline":
                bgColor = color.bgCard
                textColor = color.primary
                borderColor = color.primary
                break
            case "success":
                bgColor = "#1CC88A"
                textColor = "#fff"
                borderColor = "#1CC88A"
                break
            case "error":
                bgColor = "#E74A3B"
                textColor = "#fff"
                borderColor = "#E74A3B"
                break
        }

        return { bgColor, textColor, borderColor }
    }, [color, type])

    return (
        <TouchableOpacity
            disabled={isLoading || disable}
            activeOpacity={0.6}
            style={[
                styles.root,
                {
                    backgroundColor: (isLoading || disable) ? color.disable : colorBtn.bgColor,
                    borderColor: colorBtn.borderColor
                },
                style
            ]}
            onPress={onPress}
        >
            {isLoading ? <ActivityIndicator size="small" color="#ffffff" /> : (children ?? <TextUi style={[{ color: colorBtn.textColor, fontWeight: "500" }, styleText]}>{text}</TextUi>)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: 12,
        height: 42,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1
    }
})

export default ButtonUi