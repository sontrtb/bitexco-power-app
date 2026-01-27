import * as yup from "yup";

const validationSchema = () => {
    return yup.object().shape({
        username: yup
            .string()
            .required("Tên đăng nhập không được để trống"),
    });
}

export {
    validationSchema
};
