import { applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunlMiddleweare  from 'redux-thunk'
import { authReducer } from './aythReduser'
import { profileReducer } from './profileReducer'
import { userReduser } from './userReducer'


const redusers = combineReducers({
    profile: profileReducer,
    users: userReduser,
    auth: authReducer
})

export const store = createStore(redusers, applyMiddleware(thunlMiddleweare))
