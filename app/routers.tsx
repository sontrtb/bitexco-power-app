import useColor from '@/hooks/useColor';
import useNotificationObserver from '@/hooks/useNotificationObserver';
import { useAuth } from '@/stores/useAuth';
import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Routers() {
    const { user } = useAuth()

    const insets = useSafeAreaInsets();
    const bottomBarHeight = Platform.OS === "android" ? insets.bottom : 0;

    const color = useColor();

    useNotificationObserver();

    const renderStatusAuth = useMemo(() => {
        if (user) {
            return ({
                isLogin: true,
            })
        }

        return ({
            isLogin: false,
        })
    }, [user])

    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: color.bg },
                headerStyle: { backgroundColor: color.bgCard },
                headerTintColor: color.text,
            }}
        >
            <Stack.Protected guard={renderStatusAuth.isLogin}>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        title: "Trang chủ",
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="profile"
                    options={{
                        title: 'Trang cá nhân',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />

                <Stack.Screen
                    name="operating-parameters"
                    options={{
                        title: 'Thông số vận hành',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />

                <Stack.Screen
                    name="official-dispatch-create"
                    options={{
                        title: 'Thêm mới công văn',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />

                <Stack.Screen
                    name="user-update"
                    options={{
                        title: 'Cập nhật thông tin cá nhân',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />

            </Stack.Protected>

            <Stack.Protected guard={!renderStatusAuth.isLogin}>
                <Stack.Screen
                    name="auth/login"
                    options={{
                        headerShown: false,
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }} />
                <Stack.Screen
                    name="auth/forgot-password"
                    options={{
                        headerShown: false,
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
            </Stack.Protected>

            <Stack.Screen
                name="tems/terms-of-use"
                options={{
                    title: 'Điều khoản sử dụng',
                    headerBackButtonDisplayMode: "minimal",
                    contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }}
            />
            <Stack.Screen
                name="tems/confidentiality-policy"
                options={{
                    title: 'Chính sách bảo mật',
                    headerBackButtonDisplayMode: "minimal",
                    contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }}
            />
        </Stack>
    )
}

export default Routers