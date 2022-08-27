import { userAPI } from "../api/api"

const GET_USERS_DATA = '//USERS_GET_USERS_DATA'
const SET_CURRENT_PAGE = '//USERS_SET_CURRENT_PAGE'
const FOLLOW = '//USERS_FOLLOW'
const DISABLED_FOLLOW = '//USERS_DISABLED_FOLLOW'

const initialState = {
  users: [],
  currentPage: 1,
  totalCount: null,
  error: null,
  disabledFollow: []
}

export const userReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_DATA:
      return {
        ...state,
        users: action.payload.items,
        totalCount: action.payload.totalCount,
        error: action.payload.error
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => (user.id === action.payload.id)
          ? { ...user, followed: action.payload.bollean }
          : user
        )
      }
    case DISABLED_FOLLOW:
      return {
        ...state,
        disabledFollow: action.payload.bollean
          ? [...state.disabledFollow, action.payload.userId]
          : state.disabledFollow.filter(id => id !== action.payload.userId)
      }
    default:
      return state
  }

}

const disabledFollow = (userId, bollean) => ({
  type: DISABLED_FOLLOW,
  payload: { userId, bollean }
})


const followedAC = (userId, bollean) => ({
  type: FOLLOW,
  payload: { id: userId, bollean }
})

const getUsersAC = (data) => ({
  type: GET_USERS_DATA,
  payload: data
})

export const setCurrentPageAC = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
})

export const getUserThunk = (currentPage, pageSize) => async (dispatch) => {
  const response = await userAPI.getUsers(currentPage, pageSize)
  dispatch(getUsersAC(response))
}

export const onFollow = (userId) => async (dispatch) => {
  dispatch(disabledFollow(userId, true))
  const response = await userAPI.getFollow(userId)
  if (response.data.resultCode === 0) {
    dispatch(followedAC(userId, true))
  }
  dispatch(disabledFollow(userId, false))
}

export const deleteFollow = (userId) => async (dispatch) => {
  dispatch(disabledFollow(userId, true))
  const response = await userAPI.deleteFollow(userId)
  if (response.data.resultCode === 0) {
    dispatch(followedAC(userId, false))
  }
  dispatch(disabledFollow(userId, false))
}

