import useColor from "@/hooks/useColor";
import { StyleSheet } from "react-native";
import ButtonUi from "./ButtonUi";
import Row from "./Row";

export interface ITabButton {
        value: string;
        label: string;
    }

interface ButtonSelectUiProps {
    tabSelected: ITabButton,
    listTab: ITabButton[],
    setTabSelected: (tabSelected: ITabButton) => void
}

function ButtonSelectUi(props: ButtonSelectUiProps) {
    const { listTab, setTabSelected, tabSelected } = props

    const colors = useColor()

    return (
        <Row style={{justifyContent: "flex-start"}}>
            {
                listTab.map(tab => (
                    <ButtonUi
                        key={tab.value}
                        text={tab.label}
                        style={[styles.tab, tabSelected.value !== tab.value && {
                            backgroundColor: colors.disable,
                            borderColor: colors.disable,

                        }]}
                        styleText={tabSelected.value !== tab.value && { color: colors.textNeutral }}
                        onPress={() => setTabSelected(tab)}
                    />
                ))
            }
        </Row>
    )
}

export default ButtonSelectUi

const styles = StyleSheet.create({
    root: {

    },
        tab: {
        borderRadius: 12
    },
})