import AuthLayout from "@/components/commons/AuthLayout";
import ButtonUi from "@/components/ui/ButtonUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { validationSchema } from "./validation";

function ForgotPassword() {
    const router = useRouter()

    const onBack = () => {
        if (router.canGoBack())
            router.back()
    }

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<{ username: string }>({
        defaultValues: {
            username: '',
        },
        resolver: yupResolver(validationSchema()),
    })

    return (
        <AuthLayout
            backAction={onBack}
        >
            <View style={styles.root}>
                <TextUi style={styles.title}>Lấy lại mật khẩu</TextUi>
                <TextUi>{`Nhập email bạn đã đăng ký để lấy lại mật khẩu.\nChúng tôi sẽ gửi mật khẩu mới cho bạn qua email`}</TextUi>

                <View style={styles.form}>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => {
                            return <TextInputUi
                                errorText={errors.username?.message}
                                label="Email"
                                placeholder="Nhập email"
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                        }}
                    />
                </View>

                <ButtonUi
                    text="Xác nhận"
                />
                <ButtonUi
                    type="outline"
                    text="Về trang đăng nhập"
                    onPress={onBack}
                />
            </View>


        </AuthLayout>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        padding: PADDING_PAGE,
        gap: 12
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
    },
    form: {
        marginVertical: 100
    }
})