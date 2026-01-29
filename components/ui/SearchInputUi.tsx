import useColor from "@/hooks/useColor";
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, TextInput, View } from "react-native";
import ButtonUi from "./ButtonUi";
import TouchableOpacityUi from "./TouchableOpacityUi";

interface SearchInputUiProps {
    onFilter?: () => void
    onAdd?: () => void;
}

function SearchInputUi(props: SearchInputUiProps) {
    const { onFilter, onAdd } = props;

    const colors = useColor()

    return (
        <View style={styles.root}>
            <View style={[styles.inputWrap, { backgroundColor: colors.bgCard }]}>
                <Fontisto name="search" size={18} color={colors.text} />
                <TextInput
                    placeholder="Tìm kiếm"
                    style={[styles.input,]}
                />
                <TouchableOpacityUi hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }} onPress={onFilter}>
                    <MaterialIcons name="tune" size={20} color={colors.text} />
                </TouchableOpacityUi>
            </View>
            {
                onAdd &&
                <ButtonUi style={styles.btnAdd} onPress={onAdd}>
                    <AntDesign name="plus" size={24} color="#fff" />
                </ButtonUi>
            }

        </View>
    )
}

export default SearchInputUi

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        gap: 8
    },
    inputWrap: {
        borderRadius: 22,
        overflow: "hidden",
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        gap: 4,
        flex: 1
    },
    input: {
        height: 44,
        flex: 1
    },
    btnAdd: {
        width: 52
    }
})
