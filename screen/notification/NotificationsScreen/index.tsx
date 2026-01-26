import { getNotifications, INotification, markAllAsReadNotification } from "@/api/notifications";
import FlatListLazy, { FlatListLazyRef } from "@/components/commons/FlatListLazy";
import HeaderHome from "@/components/commons/HeaderHome";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { useCountNoti } from "@/stores/useCountNoti";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import NotificationItem from "./components/NotificationItem";


function NotificationsScreen() {
    const color = useColor()

    const { setCount } = useCountNoti()

    const flatListRef = useRef<FlatListLazyRef>(null);

    const markAllAsReadNotificationMutation  = useMutation({
        mutationFn: markAllAsReadNotification,
        onSuccess: () => {
            flatListRef.current?.refreshClearPage();
            setCount(0)
        }
    })

    const handleMarkAllAsRead = () => {
        markAllAsReadNotificationMutation.mutate()
    }
   
    return (
        <View style={[styles.root, { backgroundColor: color.bg }]}>
            <HeaderHome
                title="Thông báo"
                action={
                    <TouchableOpacityUi
                        onPress={handleMarkAllAsRead}
                        disabled={markAllAsReadNotificationMutation.isPending}
                    >
                        <FontAwesome6 name="list-check" size={22} color="#fff" />
                    </TouchableOpacityUi>
                }
            />

            <FlatListLazy<INotification>
                ref={flatListRef}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <NotificationItem item={item}/>}
                queryKey={["getNotifications"]}
                queryFn={getNotifications}
            />
        </View>
    );
}

export default NotificationsScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
});