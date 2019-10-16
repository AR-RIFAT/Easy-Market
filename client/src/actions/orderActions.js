import axios from 'axios';

import { GET_ERRORS, GET_ORDER, GET_NEW_ORDER, LOADING } from './types';

// Get all Orders
export const getAllOrders = (check) => dispatch => {
    dispatch(setLoading());
    axios.post('/api/admin/allOrders', check)
    .then(res => {
        if(res.data.ok){
            if(check.check === '1'){
                dispatch({
                    type: GET_NEW_ORDER,
                    payload: res.data.order
                })
            } else {
                dispatch({
                    type: GET_ORDER,
                    payload: res.data.order
                })
            }
        } else {
            dispatch({
                type: GET_ORDER,
                payload: {}
            })
        }
    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: {}
        }) 
    );
};

// Get user Orders
export const getOrder = () => dispatch => {
    dispatch(setLoading());
    axios.get('/api/customer/myorders')
    .then(res => {
        if(res.data.ok){
            dispatch({
                type: GET_ORDER,
                payload: res.data.order
            })
        } else {
            dispatch({
                type: GET_ORDER,
                payload: {}
            })
        }
    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: {}
        }) 
    );
};

// Get supplier Orders
export const getSupplierOrders = (check) => dispatch => {

    axios.post('/api/admin/supplierOrders', check)
    .then(res => {
        if(res.data.ok){
            if(check.check === '1'){
                dispatch({
                    type: GET_NEW_ORDER,
                    payload: res.data.order
                })
            } else {
                dispatch({
                    type: GET_ORDER,
                    payload: res.data.order
                })
            }
        } else {
            dispatch({
                type: GET_ORDER,
                payload: {}
            })
        }
    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: {}
        }) 
    );
};

// Process Order
export const processOrder = (userData) => dispatch => {
    
    axios.post('/api/admin/processOrder', userData)
    .then(res => {
        console.log('A');
        window.location.reload();
    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: {}
        }) 
    );
};

// Receive Order
export const receiveOrder = (userData) => dispatch => {
    axios.post('/api/admin/receiveOrder', userData)
    .then(res => {
        console.log('A');
        window.location.reload();
    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: {}
        }) 
    );
};

// Set Loading
export const setLoading = () => {
    return {
      type: LOADING
    };
  };