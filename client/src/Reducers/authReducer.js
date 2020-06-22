import { SET_CURRENT_USER ,LOGIN_SUCCESS , LOGOUT_SUCCESS} from '../Actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: action.payload.auth,
                user: action.payload.sessUser
            }

        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: action.payload.auth,
                user: action.payload.sessUser

            }

            case LOGOUT_SUCCESS:
                return{
                    ...state,
                    isAuthenticated: action.payload.auth,
                    user: action.payload.msg
    
                }
        default: 
            return state;
    }
} 


