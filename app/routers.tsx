import TouchableOpacityUi from '@/components/ui/TouchableOpacityUi';
import useColor from '@/hooks/useColor';
import useNotificationObserver from '@/hooks/useNotificationObserver';
import { useApartment } from '@/stores/useApartments';
import { useAuth } from '@/stores/useAuth';
import Feather from '@expo/vector-icons/Feather';
import { Stack, router } from 'expo-router';
import { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Routers() {
    const { user } = useAuth()
    const { apartmentSelect } = useApartment()

    const insets = useSafeAreaInsets();
    const bottomBarHeight = Platform.OS === "android" ? insets.bottom : 0;

    const color = useColor();

    useNotificationObserver();

    const renderStatusAuth = useMemo(() => {
        if (apartmentSelect) {
            return ({
                isLogin: false,
                isApartment: true,
                isNotUser: false
            })
        }

        if (user) {
            return ({
                isLogin: true,
                isApartment: false,
                isNotUser: false
            })
        }

        return ({
            isLogin: false,
            isApartment: false,
            isNotUser: true
        })
    }, [apartmentSelect, user])

    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: color.bg },
                headerStyle: { backgroundColor: color.bg },
                headerTintColor: color.text,
            }}
        >
            <Stack.Protected guard={renderStatusAuth.isApartment}>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        title: "Trang chủ",
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="contact/index"
                    options={{
                        title: 'Thông tin liên hệ',
                        presentation: 'modal',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />

                {/* news */}
                <Stack.Screen
                    name="news/index"
                    options={{
                        title: 'Tin tức',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                <Stack.Screen
                    name="news/[id]"
                    options={{
                        title: 'Chi tiết tin',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />

                {/* sẻvice */}
                <Stack.Screen
                    name="histories-service/index"
                    options={{
                        title: 'Lịch sử dịch vụ',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                <Stack.Screen
                    name="services/index"
                    options={{
                        title: 'Danh sách tiện ích',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        },
                        headerRight: () => (
                            <TouchableOpacityUi
                                onPress={() => {
                                    router.push('/histories-service')
                                }}
                            >
                                <Feather name="list" size={24} color={color.text} />
                            </TouchableOpacityUi>
                        ),
                    }}
                />
                <Stack.Screen
                    name="services/book-service/[id]"
                    options={{
                        title: 'Đăng ký tiện ích',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                <Stack.Screen
                    name="services/package-service/[id]"
                    options={{
                        title: 'Gói tiện ích',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />

                {/*  */}

                {/* repair-service */}
                <Stack.Screen
                    name="repair-service/index"
                    options={{
                        title: 'Dịch vụ sửa chữa',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        },
                        headerRight: () => (
                            <TouchableOpacityUi
                                onPress={() => {
                                    router.push('/repair-service/histories-repair-service')
                                }}
                            >
                                <Feather name="list" size={24} color={color.text} />
                            </TouchableOpacityUi>
                        ),
                    }}
                />
                <Stack.Screen
                    name="repair-service/create/[id]"
                    options={{
                        title: 'Tạo yêu cầu sửa chữa',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                <Stack.Screen
                    name="repair-service/histories-repair-service"
                    options={{
                        title: 'Yêu cầu sửa chữa',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                <Stack.Screen
                    name="repair-service/detail/[id]"
                    options={{
                        title: 'Chi tiết',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                {/*  */}

                <Stack.Screen
                    name="invoices/index"
                    options={{
                        title: 'Hóa đơn',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                <Stack.Screen
                    name="invoices/[id]"
                    options={{
                        title: 'Chi tiết hóa đơn',
                        headerBackButtonDisplayMode: "minimal",
                    }}
                />

                <Stack.Screen
                    name="residents-opinions/index"
                    options={{
                        title: 'Ý kiến cư dân',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                <Stack.Screen
                    name="residents-opinions/create"
                    options={{
                        title: 'Tạo ý kiến',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
                <Stack.Screen
                    name="residents-opinions/[id]"
                    options={{
                        title: 'Chi tiết ý kiến',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />

                {/* noti */}
                <Stack.Screen
                    name="notification/[id]"
                    options={{
                        title: 'Chi tiết thông báo',
                        headerBackButtonDisplayMode: "minimal",
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
            </Stack.Protected>

            <Stack.Protected guard={renderStatusAuth.isNotUser}>
                <Stack.Screen
                    name="auth/login"
                    options={{
                        headerShown: false,
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }} />
                <Stack.Screen
                    name="auth/register"
                    options={{
                        headerShown: false,
                        contentStyle: {
                            paddingBottom: bottomBarHeight
                        }
                    }}
                />
            </Stack.Protected>

            <Stack.Protected guard={renderStatusAuth.isLogin}>
                <Stack.Screen name="auth/select-domain" options={{
                    headerShown: false, contentStyle: {
                        paddingBottom: bottomBarHeight
                    }
                }} />
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