import { IRepairService } from "@/api/repair-service";
import ImageUi from "@/components/ui/ImageUi";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useTheme from "@/hooks/useColor";
import { renderURLFile } from "@/lib/file";
import { PADDING_PAGE } from "@/theme/layout";
import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function RepairServiceItem(props: IRepairService) {
    const color = useTheme();
    const router = useRouter();

    return (
        <TouchableOpacityUi
            style={styles.item}
            onPress={() => {
                router.push({
                    pathname: '/repair-service/create/[id]',
                    params: {
                        id: props.id,
                        otherParam: JSON.stringify(props)
                    },
                })
            }}
        >
            <View style={[
                styles.iconWrap,
                {
                    backgroundColor: color.bgImage
                }
            ]}>
                <ImageUi
                    source={{
                        uri: renderURLFile(props.imagePath)
                    }}
                    style={[styles.icon]}
                />
            </View>

            <TextUi style={{ textAlign: "center" }}>{props.name}</TextUi>
        </TouchableOpacityUi >
    )
}

export default RepairServiceItem

const styles = StyleSheet.create({
    iconWrap: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        marginBottom: 10
    },
    name: {
        fontSize: 18,
        fontWeight: "500",
    },
    idWrap: {
        marginTop: 8,
        justifyContent: "flex-start"
    },
    item: {
        alignItems: "center",
        width: (windowWidth - PADDING_PAGE * 4 - 60) / 4
    },
    icon: {
        width: 30,
        height: 30,
    }
})