import { authAPI } from "../api/api"


const SET_USER_AUTH = '//AUTH_SET_USER_AUTH'
const GET_CAPCTCHA_AUTH = '//AUTH_GET_CAPCTCHA_AUTH'

const initialState = {
    isAuth: false,
    email: null,
    userId: null,
    login: null,
    captchaURL: null
}

export const authReducer = (state = initialState, action ) => {
    console.log(action.payload);
    switch (action.type) {
        case SET_USER_AUTH: 
        return {
            ...state,
            isAuth: true,
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

export const onLogin = ({email, password, rememberMe=false, captcha=null}) => async (dispatch) => {
   const response = await authAPI.setAuth(email, password, rememberMe, captcha)
    if (response.resultCode === 0) {
        const res = await authAPI.getAuthMe(response.data.userId)
        if (res.resultCode === 0)
        console.log(res.data, 'res')
        dispatch(setUserAuth(res.data.data))
    } else {
        if (response.resultCode === 10) {
           const captcha = await authAPI.getCaptcha()
           dispatch(getCaptcha(captcha))
        }
    }
}