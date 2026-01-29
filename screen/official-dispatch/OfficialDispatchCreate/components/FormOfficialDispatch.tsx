import ButtonUi from "@/components/ui/ButtonUi";
import DatePickerUi from "@/components/ui/DatePickerUi";
import Row from "@/components/ui/Row";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import SpaceUi from "@/components/ui/SpaceUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TitleUi from "@/components/ui/Title";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { validationSchema } from "./validation";

function FormOfficialDispatch() {

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {},
        resolver: yupResolver(validationSchema()),
    })


    const onSubmit: SubmitHandler<any> = (v: any) => {

    }


    return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle} style={styles.root}>
            <TitleUi>Thông tin công văn</TitleUi>
            <SpaceUi height={4} />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <TextInputUi
                        errorText={errors.username?.message}
                        label="Số công văn đến "
                        value={field.value}
                        required
                        onChangeText={field.onChange}
                    />
                }}
            />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <DatePickerUi
                        // errorText={errors.username?.message}
                        label="Ngày ban hành"
                        // placeholder="Nhập tài khoản"
                        value={new Date()}
                        onChange={field.onChange}
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
                                value: "Abc",
                                label: "ABC"
                            },
                            {
                                value: "2",
                                label: "XYZ"
                            }
                        ]}
                        errorText={errors.username?.message}
                        label="Đơn vị ban hành"
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
                        label="Nội dung công văn đến"
                        placeholder="Nhập Số công văn đến "
                        value={field.value}
                        required
                        onChangeText={field.onChange}
                        multiline
                        height={200}
                    />
                }}
            />

            <Controller
                name="username"
                control={control}
                render={({ field }) => {
                    return <DatePickerUi
                        // errorText={errors.username?.message}
                        label="Ngày nhận"
                        // placeholder="Nhập tài khoản"
                        value={new Date()}
                        onChange={field.onChange}
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
                                value: "Abc",
                                label: "ABC"
                            },
                            {
                                value: "2",
                                label: "XYZ"
                            }
                        ]}
                        errorText={errors.username?.message}
                        label="Loại công văn"
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
                                value: "Abc",
                                label: "ABC"
                            },
                            {
                                value: "2",
                                label: "XYZ"
                            }
                        ]}
                        errorText={errors.username?.message}
                        label="Đơn vị"
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
                                value: "Abc",
                                label: "ABC"
                            },
                            {
                                value: "2",
                                label: "XYZ"
                            }
                        ]}
                        errorText={errors.username?.message}
                        label="Lãnh đạo đơn vị"
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
                                value: "Abc",
                                label: "ABC"
                            },
                            {
                                value: "2",
                                label: "XYZ"
                            }
                        ]}
                        errorText={errors.username?.message}
                        label="Người nhận"
                        placeholder="Nhập tài khoản"
                    // value={field.value}
                    // onChangeText={field.onChange}
                    />
                }}
            />

            <SpaceUi height={20} />
            <Row>
                <ButtonUi
                    text="Huỷ"
                    style={[styles.button, {backgroundColor: "#E74A3B"}]}
                    onPress={handleSubmit(onSubmit)}
                />
                <ButtonUi
                    text="Lưu"
                    style={[styles.button, {backgroundColor: "#1CA8C8"}]}
                    onPress={handleSubmit(onSubmit)}
                />
                <ButtonUi
                    text="Gửi"
                    style={[styles.button, {backgroundColor: "#1CC88A"}]}
                    onPress={handleSubmit(onSubmit)}
                />
            </Row>
        </ScrollView>
    )
}

export default FormOfficialDispatch

const styles = StyleSheet.create({
    root: {

    },
    contentContainerStyle: {
        padding: PADDING_PAGE,
        gap: 8
    },
    button: {
        flex: 1,
        borderWidth: 0
    }
})