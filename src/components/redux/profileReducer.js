import { useSelector } from "react-redux"
import { profileAPI } from "../api/api"
import { getUserAuth } from "./aythReduser"

const GET_PROFILE_USER = '//PROFILE_GET_PROFILE_USER'
const GET_STATUS_USER = '//PROFILE_GET_STATUS_USER'
const SET_PHOTOS_USER = '//PROFILE_SET_PHOTOS_USER'
const SET_POSTS_USER = '//PROFILE_SET_POSTS_USER'
const DELETE_POSTS_USER = '//PROFILE_DELETE_POSTS_USER'

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
    status: '',
    posts: [{
        id: null,
        body: null,
        photos: null 
    }]

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
        case SET_PHOTOS_USER:
            return {
                ...state,
                photos: action.payload
            }
        case SET_POSTS_USER:
            const id = Date.now()
            return {
                ...state,
                posts: [...state.posts, {id: id, ...action.payload}]
            }
        case DELETE_POSTS_USER:
            return {
                ...state,
                posts: [...state.posts].filter(post => post.id !== action.payload)
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

const setPhotos = (photo) => ({
    type: SET_PHOTOS_USER,
    payload: photo
})

export const setPosts = (body, photos) => ({
    type: SET_POSTS_USER,
    payload: {photos, body} 
})

export const deletePosts = (id) => ({
    type: DELETE_POSTS_USER,
    payload: id 
})

const getStatusThunk = (userId) => async (dispatch) => {
    const status = await profileAPI.getStatusId(userId)
    dispatch(getStatuseAC(status))
}

export const getProfileThunk = (userId) => async (dispatch) => {
    if (!userId) {
        debugger
        userId = useSelector(state => state.users.userId)
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

export const setPhotoProfile = (photo) => async (dispatch) => {
    const response = await profileAPI.setPhotosProfile(photo)
    if (response.data.resultCode === 0) {
        dispatch(setPhotos(response.data.data.photos))
    }
}