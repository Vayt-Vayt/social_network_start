import { getUserAuth } from "./aythReduser"


const SET_INITIALIZED_APP = 'SET_INITIALIZED_APP'

const initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_APP:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

const setInitialized = () => ({
    type : SET_INITIALIZED_APP,
})

export const initializedThunk = () =>  (dispatch) => {
    let promise = dispatch(getUserAuth())
    promise.then(() => dispatch(setInitialized()))
}
