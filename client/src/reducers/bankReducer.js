import { GET_TOTAL_ITEM, CART_LOADING } from '../actions/types';

const initialState = {
    cart: {},
    totalItem: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CART_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_TOTAL_ITEM:
            return {
                ...state,
                totalItem: action.payload,
                loading: false
            };
        default:
            return state;
    }
}