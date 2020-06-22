import {combineReducers} from 'redux'
import errorReducer from './errorReducer';
import authReducer from './authReducer'



export const rootReducer=combineReducers({
    auth:authReducer,
    errors: errorReducer,
})

 //we can pass here other reducers here also in same way we can change name here also