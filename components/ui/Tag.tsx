

import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import TextUi from "./TextUi";

interface TagProps {
    type: "error"
    text?: string;
}

function Tag(props: TagProps) {
    const { type, text } = props;

    const renderColor = useMemo(() => {
        let textColor;
        let bgColor;

        switch (type) {
            case "error":
                textColor = "#E30B0B";
                bgColor = "#EDB4B3";

        }

        return { textColor, bgColor }
    }, [type])

    return (
        <View
            style={[
                styles.statusBadge,
                { backgroundColor: renderColor.bgColor }
            ]}
        >
            <TextUi style={[styles.statusText, { color: renderColor.textColor }]}>
                {text}
            </TextUi>
        </View>
    )
}

export default Tag

const styles = StyleSheet.create({
    statusBadge: {
        paddingHorizontal: 12,
        height: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    statusText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
})