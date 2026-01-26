import { getHotline } from "@/api/contact";
import CardUi from "@/components/ui/CardUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import Feather from '@expo/vector-icons/Feather';
import { useQuery } from "@tanstack/react-query";
import { FlatList, Linking, StyleSheet, TouchableOpacity, View } from "react-native";

function ContactScreen() {
    const color = useColor()

    const getHotlineQuery = useQuery({
        queryKey: ["getHotline"],
        queryFn: getHotline
    })

    const handleCallPhone = (phoneNumber?: string) => {
        Linking.openURL(`tel:${phoneNumber}`)
    }

    return (
        <FlatList
            data={getHotlineQuery.data?.data}
            contentContainerStyle={[styles.root, {backgroundColor: color.bg}]}
            renderItem={({ item }) => {
                return (
                    <CardUi style={styles.item}>
                        <TouchableOpacity 
                            onPress={() => handleCallPhone(item.hotline)}
                            activeOpacity={0.7}
                        >
                            <Row style={styles.row}>
                                <View style={[styles.iconContainer, { backgroundColor: color.bgImage }]}>
                                    <Feather name="phone-call" size={24} color={color.primary} />
                                </View>
                                <View style={styles.infoContainer}>
                                    <TextUi style={styles.hotlineText}>{item.hotline}</TextUi>
                                    <TextUi style={styles.functionText}>{item.function}</TextUi>
                                </View>
                                <Feather name="chevron-right" size={20} color={color.text} />
                            </Row>
                        </TouchableOpacity>
                        
                        {item.contactPoint && (
                            <Row style={styles.row2}>
                                <Feather name="map-pin" size={16} color={color.text} />
                                <TextUi style={styles.addressText}>{item.contactPoint}</TextUi>
                            </Row>
                        )}
                    </CardUi>
                )
            }}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default ContactScreen

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        paddingBottom: PADDING_PAGE * 2
    },
    item: {
        marginBottom: PADDING_PAGE
    },
    row: {
        justifyContent: "space-between",
        alignItems: "center"
    },
    row2: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0"
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12
    },
    infoContainer: {
        flex: 1
    },
    hotlineText: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4
    },
    functionText: {
        fontSize: 14,
        opacity: 0.7
    },
    addressText: {
        fontSize: 13,
        opacity: 0.6,
        marginLeft: 8,
        flex: 1
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: PADDING_PAGE
    },
    errorText: {
        marginTop: 16,
        fontSize: 16,
        textAlign: "center"
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        textAlign: "center",
        opacity: 0.6
    }
})