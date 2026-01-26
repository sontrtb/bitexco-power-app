import * as yup from "yup";

const validationSchema = () => {
    return yup.object().shape({
        utilityPackageId: yup
            .number()
            .required("Vui lòng chọn khung giờ"),
        quantity: yup
            .number()
            .required("Vui lòng nhập số lượng"),
        registrationDate: yup
            .string()
            .required("Vui lòng chọn ngày"),

        phoneNumber: yup
            .string()
            .required("Vui lòng nhập số điện thoại"),
        paymentMethod: yup
            .number()
            .required("Vui lòng chọn phương thức thanh toán"),
        note: yup
            .string()
            .optional()
    });
}

type IForm = yup.InferType<ReturnType<typeof validationSchema>>;

export {
    IForm, validationSchema
};

