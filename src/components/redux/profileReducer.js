import { profileAPI } from "../api/api"

const GET_PROFILE_USER = '//PROFILE_GET_PROFILE_USER'
const GET_STATUS_USER = '//PROFILE_GET_STATUS_USER'

const initialState = {
    userId: null,
    lookingForAJob: null,
    lookingForAJobDescription: null,
    fullName: null,
    contacts: {
        github: null,
        vk: null,
        facebook: null,
        instagram: null,
        twitter: null,
        website: null,
        youtube: null,
        mainLink: null,
    },
    photos: null,
    status: ''

}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_USER:
    console.log(action.payload);
            return {
                ...state,
                ...action.payload
            }
        case GET_STATUS_USER: 
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}


const getProfileAC = (data) => ({
    type: GET_PROFILE_USER,
    payload: data
})

const getStatuseAC = (status) => ({
    type: GET_STATUS_USER,
    payload: status
})

export const getProfileThunk = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfileId(userId)
    const status = await profileAPI.getStatusId(userId)
    dispatch(getProfileAC(response))
    dispatch(getStatuseAC(status))
}

