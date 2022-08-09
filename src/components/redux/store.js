import { applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunlMiddleweare  from 'redux-thunk'
import { profileReducer } from './profileReducer'
import { userReduser } from './userReducer'


const redusers = combineReducers({
    profile: profileReducer,
    users: userReduser
})

export const store = createStore(redusers, applyMiddleware(thunlMiddleweare))
