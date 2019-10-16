import { GET_TOTAL_ITEM, GET_CART, ADD_ITEM, CART_LOADING } from '../actions/types';

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
        case ADD_ITEM:
                return {
                    ...state,
                    cart: action.payload,
                    totalItem: { total: action.payload.cart.totalQty },
                    loading: false
                };
        case GET_CART:
                return {
                    ...state,
                    cart: action.payload,
                    loading: false
                };
        default:
            return state;
    }
}