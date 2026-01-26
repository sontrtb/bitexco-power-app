
import { INotification } from "@/api/notifications";
import CardUi from "@/components/ui/CardUi";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { useCountNoti } from "@/stores/useCountNoti";
import { PADDING_PAGE } from "@/theme/layout";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { getColorByType, getIconByType } from "../../const";

function NotificationItem({ item }: { item: INotification }) {
    const router = useRouter()

    const { reduceCount } = useCountNoti()

    const color = useColor();

    const [isRead, setIsRead] = useState(item.status === 1)

    const handleMarkAsRead = (id: number) => {
        setIsRead(true)
        if (item.status === 0) {
            reduceCount()
        }
        router.push(`/notification/${id}`)
    }

    return (
        <TouchableOpacityUi
            onPress={() => handleMarkAsRead(item.id)}
            style={{marginBottom: PADDING_PAGE}}
        >
            <CardUi style={[
                styles.notificationItem,
                isRead && { opacity: 0.6 },
            ]}>
                <View style={[styles.iconContainer, { backgroundColor: getColorByType() + '15' }]}>
                    <FontAwesome6
                        name={getIconByType()}
                        size={20}
                        color={getColorByType()}
                    />
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <TextUi style={[styles.title, { color: color.primary }]}>
                            {item.title}
                        </TextUi>
                        {!isRead && <View style={styles.unreadDot} />}
                    </View>
                    <TextUi style={[styles.message]} numberOfLines={2}>
                        {item.content}
                    </TextUi>
                </View>
            </CardUi>
        </TouchableOpacityUi>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },

    notificationItem: {
        flexDirection: 'row',
        gap: 12
    },
    unreadItem: {
        backgroundColor: '#e2ffe3'
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        gap: 4
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1
    },
    message: {
        lineHeight: 20
    },
    time: {
        fontSize: 12,
        color: '#9e9e9e',
        marginTop: 2
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2E7D32'
    },
});

export default NotificationItem