import { GET_ORDER, GET_NEW_ORDER, LOADING } from '../actions/types';

const initialState = {
    order: {},
    newOrder: {},
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING:
            return {
              ...state,
              loading: true
            };
        case GET_ORDER:
                return {
                    ...state,
                    order: action.payload,
                    loading: false
                };
        case GET_NEW_ORDER:
                return {
                    ...state,
                    newOrder: action.payload,
                    loading: false
                };
        default:
            return state;
    }
}