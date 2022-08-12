import { authAPI } from "../api/api"


const SET_USER_AUTH = '//AUTH_SET_USER_AUTH'
const GET_CAPCTCHA_AUTH = '//AUTH_GET_CAPCTCHA_AUTH'
const SET_ERROR_AUTH = '//AUTH_SET_ERROR_AUTH'


const initialState = {
    isAuth: false,
    email: null,
    userId: null,
    login: null,
    captchaURL: null,
    errorsAuth: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                email: action.payload.email,
                userId: action.payload.id,
                login: action.payload.login,
                captchaURL: null
            }
        case GET_CAPCTCHA_AUTH:
            return {
                ...state,
                captchaURL: action.payload
            }
        case SET_ERROR_AUTH:
            return {
                ...state,
                errorsAuth: action.payload
            }
        default:
            return state
    }
}

const getCaptcha = (captcha) => ({
    type: GET_CAPCTCHA_AUTH,
    payload: captcha
})

const setUserAuth = (data) => ({
    type: SET_USER_AUTH,
    payload: data
})

const setErrorAuth = (error) => ({
    type: SET_ERROR_AUTH,
    payload: error
})

export const getUserAuth = () => async (dispatch) => {
    const res = await authAPI.getAuthMe()
    if (res.data.resultCode === 0) {
        dispatch(setUserAuth({...res.data.data, isAuth: true}))
    }
}

export const onLogin = ({ email, password, rememberMe = false, captcha = null }) => async (dispatch) => {
    const response = await authAPI.setAuth(email, password, rememberMe, captcha)
    if (response.resultCode === 0) {
        dispatch(getUserAuth())
    } else {
        if (response.resultCode === 10) {
            const captcha = await authAPI.getCaptcha()
            dispatch(getCaptcha(captcha))
        }
        const message = (response.messages.length > 1)
            ? response.messages[0]
            : 'Email and Password is wrong'
        dispatch(setErrorAuth(message))
    }
}

export const offLogin = () => async (dispatch) => {
    const response = await authAPI.deletAuth()
    if (response.resultCode === 0) {
        dispatch(setUserAuth({ email: null, userId: null, login: null, captchaURL: null, isAuth: false }))
    }
}
