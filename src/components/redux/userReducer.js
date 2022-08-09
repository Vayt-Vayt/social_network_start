import { userAPI } from "../api/api"

const GET_USERS_DATA = '//USERS_GET_USERS_DATA'
const SET_CURRENT_PAGE = '//USERS_SET_CURRENT_PAGE'


const initialState = {
  users: [
    // {
    //   "name": "Shubert",
    //   "id": 1,
    //   "photos": {
    //     "small": null,
    //     "large": null
    //   },
    //   "status": "i'm good ",
    //   "followed": false
    // },
    // {
    //   "name": "Hacker",
    //   "id": 2,
    //   "photos": {
    //     "small": null,
    //     "large": null
    //   },
    //   "status": null,
    //   "followed": false
    // }
  ],
  currentPage: 1,
  totalCount: null,
  error: null,
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
    default:
      return state
  }

}

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