import { createRepairService, IRepairService } from "@/api/repair-service";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import ImagePickerUi from "@/components/ui/ImagePickerUi";
import KeyboardAvoidingViewUi from "@/components/ui/KeyboardAvoidingViewUi";
import RenderHtmlUi from "@/components/ui/RenderHtmlUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import { toastError, toastSuccess } from "@/lib/toast";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";
import { IForm, validationSchema } from "./validation";

const windowWidth = Dimensions.get('window').width;

function RepairServiceCreateScreen() {
    const router = useRouter();

    const { id, otherParam } = useLocalSearchParams();
    const repairService = JSON.parse(otherParam as string) as IRepairService

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema()),
        defaultValues: {
            phoneNumber: "",
            description: "",
            requestImage: "",
        },
    });

    const createOpinionMutation = useMutation({
        mutationFn: createRepairService,
        onSuccess: (res) => {
            toastSuccess("Tạo yêu cầu thành công")
            router.back();
        },
        onError: (err: any) => {
            console.log("Error:", err);
            toastError(err.message)
        },
    });

    const onCreate: SubmitHandler<IForm> = (v: IForm) => {
        createOpinionMutation.mutate({ ...v, serviceId: Number(id) });
    };

    return (
        <KeyboardAvoidingViewUi contentContainerStyle={styles.root}>
            <View style={{ gap: PADDING_PAGE }}>
                <CardUi title={repairService.name}>
                   <RenderHtmlUi htmlString={repairService?.description}/>
                </CardUi>

                <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInputUi
                                required
                                placeholder="Nhập số điện thoại"
                                label="Số điện thoại"
                                value={field.value}
                                onChangeText={field.onChange}
                                errorText={errors.phoneNumber?.message}
                            />
                        );
                    }}
                />

                <Controller
                    name="description"
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
                                errorText={errors.description?.message}
                            />
                        );
                    }}
                />

                <Controller
                    name="requestImage"
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
                text="Tạo yêu cầu"
                isLoading={createOpinionMutation.isPending}
            />
        </KeyboardAvoidingViewUi>
    );
}

export default RepairServiceCreateScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: PADDING_PAGE,
        paddingBottom: PADDING_PAGE * 2,
        justifyContent: "space-between",
    },
    imagePick: {
        gap: 8,
    },
});