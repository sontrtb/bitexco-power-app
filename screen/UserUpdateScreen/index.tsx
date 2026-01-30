import ButtonUi from "@/components/ui/ButtonUi";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import SpaceUi from "@/components/ui/SpaceUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import useColor from "@/hooks/useColor";
import { PADDING_PAGE } from "@/theme/layout";
import { Image } from 'expo-image';
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";

function UserUpdateScreen() {
    const colors = useColor()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: ""
        },
        // resolver: yupResolver(validationSchema()),
    })

    const onSave = () => { }

    return (
        <ScrollView contentContainerStyle={[styles.root, {backgroundColor: colors.bgCard}]}>
            <View style={styles.avatarCenter}>
                <Image
                    style={styles.avt}
                    source="https://picsum.photos/seed/696/3000/2000"
                    contentFit="cover"
                    transition={1000}
                />
                <SpaceUi height={12} />
                <TextUi weight="semiBold" style={{ fontSize: 16 }}>nhanvien_123</TextUi>
            </View>

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        required
                        errorText={errors.username?.message}
                        label="Tên người dùng"
                        placeholder="Tài khoản kiểm thử"
                        // value={field.value}
                        // onChangeText={field.onChange}
                    />
                }}
            />

             <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        readOnly
                        required
                        errorText={errors.username?.message}
                        label="Tên đăng nhập"
                        placeholder="demoadmin"
                        // value={field.value}
                        // onChangeText={field.onChange}
                    />
                }}
            />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <SelectOptionUi
                        options={[
                            {
                                value: "Nam",
                                label: "Nam"
                            },
                            {
                                value: "2",
                                label: "Nữ"
                            },
                            {
                                value: "3",
                                label: "Khác"
                            }
                        ]}
                        errorText={errors.username?.message}
                        label="Giới tính"
                    // value={field.value}
                    // onChangeText={field.onChange}
                    />
                }}
            />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        required
                        errorText={errors.username?.message}
                        label="Email"
                        placeholder="demoadmin@bitexcopower.com.vn"
                        // value={field.value}
                        // onChangeText={field.onChange}
                    />
                }}
            />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        errorText={errors.username?.message}
                        label="Địa chỉ"
                        placeholder="Địa chỉ"
                        // value={field.value}
                        // onChangeText={field.onChange}
                    />
                }}
            />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        errorText={errors.username?.message}
                        label="Số điện thoại"
                        placeholder="Số điện thoại"
                        // value={field.value}
                        // onChangeText={field.onChange}
                    />
                }}
            />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <SelectOptionUi
                        options={[
                            {
                                value: "Nam",
                                label: "Chuyên viên"
                            },
                            {
                                value: "2",
                                label: "Nhân viên"
                            },
                            {
                                value: "3",
                                label: "Bảo vệ"
                            }
                        ]}
                        errorText={errors.username?.message}
                        label="Chức vụ"
                    // value={field.value}
                    // onChangeText={field.onChange}
                    />
                }}
            />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        errorText={errors.username?.message}
                        label="Số tài  khoản"
                        placeholder="Số tài  khoản"
                        // value={field.value}
                        // onChangeText={field.onChange}
                    />
                }}
            />
            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        errorText={errors.username?.message}
                        label="Tên ngân hàng"
                        placeholder="Tên ngân hàng"
                        // value={field.value}
                        // onChangeText={field.onChange}
                    />
                }}
            />
            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        errorText={errors.username?.message}
                        label="Địa chỉ ngân hàng"
                        placeholder="Địa chỉ ngân hàng"
                        // value={field.value}
                        // onChangeText={field.onChange}
                    />
                }}
            />

            <ButtonUi
                text="Lưu"
                onPress={handleSubmit(onSave)}
            />
        </ScrollView>
    )
}

export default UserUpdateScreen

const styles = StyleSheet.create({
    root: {
        padding: PADDING_PAGE,
        gap: PADDING_PAGE * 2
    },
    avatarCenter: {
        alignItems: "center",
        marginBottom: 8
    },
    avt: {
        height: 80,
        width: 80,
        borderRadius: 40
    }
})