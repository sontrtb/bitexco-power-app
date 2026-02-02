import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { ReactElement } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Row from "../ui/Row";

interface RowValueLableProps {
    label: string;
    value: string | ReactElement
}

const { width } = Dimensions.get('window');

function RowValueLable(props: RowValueLableProps) {
    const { label, value } = props

    const colors = useColor()

    return (
        <Row>
            <TextUi style={[styles.text, { color: colors.textNeutral }]}>
                {label}
            </TextUi>

            {
                typeof value === "string" ?
                    <TextUi style={styles.text} numberOfLines={3}>
                        {value}
                    </TextUi> :
                    value
            }
        </Row>
    )
}

const styles = StyleSheet.create({
    root: {

    },
    text: {
        width: (width - PADDING_PAGE * 2 - 32) / 2
    },
    card: {
        gap: 8
    }
})

export default RowValueLable