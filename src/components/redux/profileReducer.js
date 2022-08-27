import { useSelector } from "react-redux"
import { profileAPI } from "../api/api"
import { getUserAuth } from "./aythReduser"

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
    if (!userId) {
        debugger
        userId = useSelector(state=>state.users.userId)
    }
    const response = await profileAPI.getProfileId(userId)
    dispatch(getStatusThunk(userId))
    dispatch(getProfileAC(response))
}



export const setStatusProfile = (status, userId) => async (dispatch) => {
    const response = await profileAPI.setStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatusThunk(userId))
    }
}

export const setInfoProfile = (data) => async (dispatch) => {
    const response = await profileAPI.setInfoProfile(data)
    if (response.data.resultCode === 0) {
        dispatch(getUserAuth())
    }
}
