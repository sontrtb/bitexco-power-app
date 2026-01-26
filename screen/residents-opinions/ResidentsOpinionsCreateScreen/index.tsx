import { createResidentComments } from "@/api/residents-opinions";
import ButtonUi from "@/components/ui/ButtonUi";
import ImagePickerUi from "@/components/ui/ImagePickerUi";
import KeyboardAvoidingViewUi from "@/components/ui/KeyboardAvoidingViewUi";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import { toastError, toastSuccess } from "@/lib/toast";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { typeOptions } from "../const";
import { IForm, validationSchema } from "./validation";

function ResidentsOpinionsCreateScreen() {
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema()),
    });

    const createOpinionMutation = useMutation({
        mutationFn: createResidentComments,
        onSuccess: (res) => {
            toastSuccess("Tạo ý kiến thành công")
            router.back();
        },
        onError: (err: any) => {
            console.log("Error:", err);
            toastError(err.message)
        },
    });

    const onCreate: SubmitHandler<IForm> = (v: IForm) => {
        createOpinionMutation.mutate(v);
    };

    return (
        <KeyboardAvoidingViewUi contentContainerStyle={styles.root}>
            <View style={{ gap: PADDING_PAGE }}>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInputUi
                                required
                                placeholder="Nhập tiêu đề"
                                label="Tiêu đề"
                                value={field.value}
                                onChangeText={field.onChange}
                                errorText={errors.title?.message}
                            />
                        );
                    }}
                />

                <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInputUi
                                required
                                placeholder="Nhập số điện thoại"
                                label="Số điện thoại"
                                keyboardType="number-pad"
                                value={field.value}
                                onChangeText={field.onChange}
                                errorText={errors.phoneNumber?.message}
                            />
                        );
                    }}
                />

                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => {
                        return (
                            <SelectOptionUi
                                required
                                label="Chọn loại ý kiến"
                                placeholder="Loại ý kiến ..."
                                options={typeOptions}
                                onChange={(v) => {
                                    field.onChange(v.value);
                                }}
                                errorText={errors.type?.message}
                            />
                        );
                    }}
                />

                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInputUi
                                required
                                placeholder="Nhập nội dung"
                                label="Nội dung"
                                multiline
                                height={120}
                                value={field.value}
                                onChangeText={field.onChange}
                                errorText={errors.content?.message}
                            />
                        );
                    }}
                />

                <Controller
                    name="imagePath"
                    control={control}
                    render={({ field }) => {
                        return (
                            <View style={styles.imagePick}>
                                <TextUi>Ảnh mô tả</TextUi>
                                <ImagePickerUi
                                    onChange={field.onChange}
                                />
                            </View>
                        );
                    }}
                />
            </View>

            <ButtonUi
                onPress={handleSubmit(onCreate)}
                text="Tạo ý kiến"
                isLoading={createOpinionMutation.isPending}
            />
        </KeyboardAvoidingViewUi>
    );
}

export default ResidentsOpinionsCreateScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: PADDING_PAGE,
        // paddingBottom: PADDING_PAGE * 2,
        justifyContent: "space-between",
    },
    imagePick: {
        gap: 8,
    },
});