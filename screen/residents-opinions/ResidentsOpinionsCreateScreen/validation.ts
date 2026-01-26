import * as yup from "yup";

const validationSchema = () => {
    return yup.object().shape({
        title: yup
            .string()
            .required("Tiêu đề không được để trống"),
        type: yup
            .string()
            .required("Vui lòng chọn loại ý kiến"),
        content: yup
            .string()
            .required("Nội dung không được để trống"),
        phoneNumber: yup
            .string()
            .required("Số điện thoại không được để trống"),
        imagePath: yup
            .string().optional()
    });
}

type IForm = yup.InferType<ReturnType<typeof validationSchema>>;


export {
    IForm, validationSchema
};

