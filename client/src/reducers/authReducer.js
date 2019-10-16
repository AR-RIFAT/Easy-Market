import { SET_CURRENT_USER, UPDATE_USER, GET_BALANCE } from '../actions/types';
import isEmpty from '../validation/is-empty';


const initialState = {
    isAuthenticated: false,
    user: {},
    balance: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
        case GET_BALANCE:
            return {
                ...state,
                balance: action.payload
            };
        default:
            return state;
    }
}