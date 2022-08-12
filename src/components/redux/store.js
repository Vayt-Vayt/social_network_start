import { applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunlMiddleweare  from 'redux-thunk'
import { appReducer } from './appReducer'
import { authReducer } from './aythReduser'
import { profileReducer } from './profileReducer'
import { userReduser } from './userReducer'


const redusers = combineReducers({
    profile: profileReducer,
    users: userReduser,
    auth: authReducer,
    app: appReducer
})

export const store = createStore(redusers, applyMiddleware(thunlMiddleweare))
