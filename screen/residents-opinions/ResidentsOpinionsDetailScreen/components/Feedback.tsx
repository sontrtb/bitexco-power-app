import { createResponseResidentComments, IResidentCommentResponse, IResidentResponseCommentBody } from "@/api/residents-opinions";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import ImagePickerUi from "@/components/ui/ImagePickerUi";
import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import useColor from "@/hooks/useColor";
import { dateTimeFormat } from "@/lib/date";
import { renderURLFile } from "@/lib/file";
import { toastError } from "@/lib/toast";
import { PADDING_PAGE } from "@/theme/layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";
import { validationSchema } from "./validation";

const windowWidth = Dimensions.get('window').width;

interface FeedbackProps {
    id: number,
    responses: IResidentCommentResponse[],
    onRefetch: () => void
}

function Feedback({ id, responses, onRefetch }: FeedbackProps) {
    const color = useColor()

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema()),
    });

    const createResponseResidentCommentsMutation = useMutation({
        mutationFn: (v: IResidentResponseCommentBody) => createResponseResidentComments(id, v),
        onSuccess: () => {
            onRefetch()
            reset()
        },
        onError: (err) => {
            toastError(err.message)
        }
    })
    const onCreate = (v: IResidentResponseCommentBody) => {
        createResponseResidentCommentsMutation.mutate(v)
    }

    return (
        <View style={[
            styles.root,
            { borderColor: color.borderColor }
        ]}>
            <TitleUi>Phản hồi</TitleUi>

            {
                responses.map(r => (
                    <CardUi key={r.id}>
                        <Row style={styles.nameWrap}>
                            <TextUi weight="bold">{r.createdByName}</TextUi>
                            <TextUi style={{ color: color.textNeutral }}>{dateTimeFormat(r.createdAt)}</TextUi>
                        </Row>
                        <TextUi>
                            {r.content}
                        </TextUi>
                        {
                            r.imagePath &&
                            <ImageUi
                                style={styles.image}
                                source={{
                                    uri: renderURLFile(r.imagePath)
                                }}
                            />
                        }
                    </CardUi>
                ))
            }

            <CardUi title="Tạo phản hồi" style={{ gap: PADDING_PAGE }}>
                <Controller
                    name="content"
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInputUi
                                required
                                placeholder="Nhập nội dung"
                                label="Nội dung"
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
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </View>
                        );
                    }}
                />

                <ButtonUi
                    onPress={handleSubmit(onCreate)}
                    text="Tạo phản hồi"
                    isLoading={createResponseResidentCommentsMutation.isPending}
                />
            </CardUi>


        </View>
    )
}

export default Feedback

const styles = StyleSheet.create({
    root: {
        borderTopWidth: 1,
        paddingTop: PADDING_PAGE,
        gap: PADDING_PAGE
    },
    nameWrap: {
        justifyContent: "flex-start",
        marginBottom: 8
    },
    image: {
        width: '100%',
        height: windowWidth / 5 * 3,
        borderRadius: 8,
        marginTop: 12
    },
    imagePick: {
        gap: 8,
    },
})