import * as yup from "yup";

export const schemaLoginInput = yup.object().shape({
    email: yup.string().required("Required field").min(3, 'Min 3 symbol').max(25, "Max 25 symbol"),
    password: yup.string().required("Required field").min(3, 'Min 3 symbol').max(25, "Max 25 symbol"),
    rememberMe: yup.boolean(),
    captcha: yup.string().required("Required field").notRequired()
})