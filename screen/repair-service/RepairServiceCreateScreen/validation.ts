import * as yup from "yup";

const validationSchema = () => {
    return yup.object().shape({
        phoneNumber: yup
            .string()
            .required("Số điện thoại không được để trống"),
        description: yup
            .string()
            .required("Nội dung không được để trống"),
        requestImage: yup
            .string()
            .optional()
    })
};

type IForm = yup.InferType<ReturnType<typeof validationSchema>>;

export {
    IForm, validationSchema
};

