import { fcmUnregister } from '@/api/fcm';
import { useAuth } from '@/stores/useAuth';
import messaging from '@react-native-firebase/messaging';
import { useMutation } from '@tanstack/react-query';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

function useLogout() {
    const { clearUser } = useAuth()

    const fcmUnregisterMutation = useMutation({
        mutationFn: fcmUnregister,
    })
    const clearTokenFirebase = async () => {
        const fcmToken = await messaging().getToken();
        const deviceName = await DeviceInfo.getDeviceName();
        const deviceId = await DeviceInfo.getUniqueId()

        fcmUnregisterMutation.mutate({
            deviceType: Platform.OS,
            deviceName: deviceName,
            fcmToken: fcmToken,
            deviceId: deviceId
        })
    }

    const onLogout = (isNotFirebase?: boolean) => {
        clearUser()

        if (!isNotFirebase) {
            clearTokenFirebase()
        }
    }

    return onLogout
}

export { useLogout };
