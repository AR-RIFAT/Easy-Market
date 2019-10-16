import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import cartReducer from './cartReducer';
import bankReducer from './bankReducer';
import orderReducer from './orderReducer';
// import profileReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    cart: cartReducer,
    bank: bankReducer,
    order: orderReducer
});