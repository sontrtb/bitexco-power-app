import useColor from "@/hooks/useColor";
import { StyleSheet, View } from "react-native";
import TextUi from "../ui/TextUi";
import TouchableOpacityUi from "../ui/TouchableOpacityUi";

export interface ITag {
    value: any;
    label: string;
}

interface ISelectTag {
    tags: ITag[],
    tagsSelected: ITag[],
    setTagsSelected: React.Dispatch<React.SetStateAction<ITag[]>>
}

function SelectTag(props: ISelectTag) {
    const { tags, tagsSelected, setTagsSelected } = props;

    const colors = useColor()

    const onChangeTag = (tag: ITag) => {
        if(tagsSelected.find(t => t.value === tag.value)) {
            const newTagelected = tagsSelected.filter(t => t.value !== tag.value)
            setTagsSelected(newTagelected)
        } else {
            setTagsSelected(pre => [...pre, tag])
        }
    }

    return (
        <View style={styles.root}>
            {
                tags.map((tag, index) => {
                    const isSelected = tagsSelected.find(t => t.value === tag.value)
                    return (
                        <TouchableOpacityUi
                            key={index}
                            onPress={() => onChangeTag(tag)}
                            style={[
                                styles.tag,
                                {
                                    backgroundColor: isSelected ? colors.primary : colors.bg,
                                }
                            ]}
                        >
                            <TextUi style={{fontWeight: "600", color: isSelected ? "#fff" : colors.text}}>{tag.label}</TextUi>
                        </TouchableOpacityUi>

                    )
                })
            }
        </View>
    )
}

export default SelectTag

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6
    },
    tag: {
        height: 32,
        paddingHorizontal: 12,
        justifyContent: "center",
        borderRadius: 16
    }
})