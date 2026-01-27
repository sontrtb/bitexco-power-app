import { fcmRegister } from '@/api/fcm';
import { getCountNotifications } from '@/api/notifications';
import useColor from '@/hooks/useColor';
import useI18n from '@/lang/i18n';
import { useCountNoti } from '@/stores/useCountNoti';
import Feather from '@expo/vector-icons/Feather';
import messaging from '@react-native-firebase/messaging';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default function TabLayout() {
  const color = useColor()
  const i18n = useI18n()

  const { setCount } = useCountNoti()

  const getCountNotificationsQuery = useQuery({
    queryFn: getCountNotifications,
    queryKey: ["getCountNotifications"]
  })
  const countNoti = getCountNotificationsQuery.data?.data

  useEffect(() => {
    setCount(countNoti ?? 0)
  }, [countNoti, setCount])
  
   useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        nextAppState === 'active'
      ) {
        getCountNotificationsQuery.refetch()
      }
    });

    return () => {
      subscription.remove();
    };
  }, [getCountNotificationsQuery]);

  // fcm token
  const fcmRegisterMutation = useMutation({
    mutationFn: fcmRegister
  })

  const initTokenFirebase = async () => {
    const fcmToken = await messaging().getToken();
    const deviceName = await DeviceInfo.getDeviceName();
    const deviceId = await DeviceInfo.getUniqueId()

    console.log("fcmToken", fcmToken)

    fcmRegisterMutation.mutate({
      deviceType: Platform.OS,
      deviceName: deviceName,
      fcmToken: fcmToken,
      deviceId: deviceId
    })
  }

  useEffect(() => {
    initTokenFirebase()
  }, [])
  // end

  return (
    <NativeTabs
      backgroundColor={color.bottomTab}
      tintColor={color.primary}
      shadowColor={color.shadow}
      indicatorColor={color.bgImage}
      disableTransparentOnScrollEdge={true}
    >
      <NativeTabs.Trigger name="index" >
        <Label>{i18n.t("bottomTab.home")}</Label>
        <Icon
          src={
            <VectorIcon
              family={Feather}
              name="home"
            />
          }
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="user"
      >
        <Icon
          src={
            <VectorIcon
              family={Feather}
              name="user"
            />
          }
        />
        <Label>{i18n.t("bottomTab.user")}</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
