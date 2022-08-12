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

const getStatusThunk = (userId) => async (dispatch) => {
    const status = await profileAPI.getStatusId(userId)
    dispatch(getStatuseAC(status))
}

export const getProfileThunk = (userId) =>  async (dispatch) => {
    const response = await profileAPI.getProfileId(userId)
    dispatch(getStatusThunk(userId))
    dispatch(getProfileAC(response))
}

/* Promise.all([promise1, number, obj])
  .then(([response1, response2, response3]) => {
    console.log(response1)
    // 1
    console.log(response2) */

export const setStatusProfile = (status) => async (dispatch) => {
    const response = await profileAPI.setStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatusThunk(status))
    }
}

