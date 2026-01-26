import * as yup from "yup";

const validationSchema = () => {
    return yup.object().shape({
        content: yup
            .string()
            .required("Nội dung không được để trống"),
        imagePath: yup
            .string().optional()
    });
}

type IForm = yup.InferType<ReturnType<typeof validationSchema>>;


export {
    IForm, validationSchema
};

