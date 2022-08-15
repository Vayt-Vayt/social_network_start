import * as yup from "yup";


export const schema = yup.object().shape({
    lookingForAJobDescription: yup.string().max(200, "Max 200 symbol"),
    fullName: yup
        .string()
        .required("Required field")
        .min(3, "Min 3 symbol")
        .max(20, "Max 20 symbol"),
    aboutMe: yup.string().required("Required field").max(200, "Max 200 symbol"),
    contacts: yup.object().shape({
        facebook: yup
            .string()
            .nullable()
            .url("URL must be a valid 'https://...' ")
            .max(200, "Max 200 symbol"),
        website: yup
            .string()
            .nullable()
            .url("URL must be a valid 'https://...' ")
            .max(200, "Max 200 symbol"),
        vk: yup
            .string()
            .nullable()
            .url("URL must be a valid 'https://...' ")
            .max(200, "Max 200 symbol"),
        twitter: yup
            .string()
            .nullable()
            .url("URL must be a valid 'https://...' ")
            .max(200, "Max 200 symbol"),
        instagram: yup
            .string()
            .nullable()
            .url("URL must be a valid 'https://...' ")
            .max(200, "Max 200 symbol"),
        youtube: yup
            .string()
            .nullable()
            .url("URL must be a valid 'https://...' ")
            .max(200, "Max 200 symbol"),
        github: yup
            .string()
            .nullable()
            .url("URL must be a valid 'https://...' ")
            .max(200, "Max 200 symbol"),
        mainLink: yup
            .string()
            .nullable()
            .url("URL must be a valid 'https://...' ")
            .max(200, "Max 200 symbol"),
    }),
});