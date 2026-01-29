import { ILoginData, login } from "@/api/auth";
import AuthLayout from "@/components/commons/AuthLayout";
import TemsLink from "@/components/commons/TemsLink";
import ButtonUi from "@/components/ui/ButtonUi";
import Row from "@/components/ui/Row";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useTheme from "@/hooks/useColor";
import useLoginHandle from "@/hooks/useLoginHandle";
import { toastError } from "@/lib/toast";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    useMutation,
} from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";
import { validationSchema } from "./validation";

const windowWidth = Dimensions.get('window').width;

function LoginScreen() {
    const color = useTheme()

    const router = useRouter()

    const onLoginSuccess = useLoginHandle()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ILoginData>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(validationSchema()),
    })

    const loginMuatation = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            onLoginSuccess(res.data)
        },
        onError: (err) => {
            console.log(err)
            toastError(err.message)
        },
    })

    const onLogin: SubmitHandler<ILoginData> = (v: ILoginData) => {
        // loginMuatation.mutate(v)
        const fakeData = {
            accessToken: "accessToken",
            username: "username001",
            fullname: "Phạm Văn A",
        }
        onLoginSuccess(fakeData)
    }

    const onForgotPassword = () => {
        router.push("/auth/forgot-password")
    }

    return (
        <AuthLayout>
            <View style={styles.root}>
                <Image style={styles.logo} source={require("@/assets/images/icon.png")} />

                <TextUi allowFontScaling={false} style={[styles.title, { color: color.primary }]}>PHẦN MỀM QUẢN LÝ</TextUi>
                <TextUi>Nghiệp vụ văn phòng</TextUi>

                <View style={styles.card}>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => {
                            return <TextInputUi
                                errorText={errors.username?.message}
                                label="Tài khoản"
                                placeholder="Nhập tài khoản"
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                        }}
                    />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => {
                            return <TextInputUi
                                isPassword
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu"
                                value={field.value}
                                onChangeText={field.onChange}
                                errorText={errors.password?.message}
                            />
                        }}
                    />

                </View>

                <View style={styles.textAction}>
                    <TextUi style={{ fontWeight: "600" }}>Ghi nhớ mất khẩu</TextUi>
                    <TouchableOpacityUi onPress={onForgotPassword}>
                        <TextUi style={{ color: color.primary }}>Quên mật khẩu</TextUi>
                    </TouchableOpacityUi>
                </View>

                <Row>
                    <ButtonUi
                        text="Đăng nhập"
                        style={styles.buttonLogin}
                        onPress={handleSubmit(onLogin)}
                        isLoading={loginMuatation.isPending}
                    />
                    {/* <Biometrics /> */}
                </Row>
                <TextUi style={{ marginTop: 8 }}>©2025 Công ty Cổ phần Năng lượng Bitexco</TextUi>
                <TemsLink />
            </View>
        </AuthLayout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: PADDING_PAGE,
        alignItems: "center",
        zIndex: 99
    },
    textAction: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
        marginBottom: 64,
        width: windowWidth - PADDING_PAGE * 2
    },
    title: {
        fontSize: 24,
        fontWeight: "600"
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "600"
    },
    card: {
        gap: 20,
        marginTop: 40,
        width: "100%"
    },
    logo: {
        height: 90,
        width: 90,
        marginBottom: 8
    },
    buttonLogin: {
        flex: 1,
    },
    forgotPassword: {
        alignItems: "flex-end",
    },
})
