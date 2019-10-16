import axios from 'axios';

import { GET_ERRORS, GET_ORDER, GET_BALANCE } from './types';

// Create Bank Account
export const createBankInfo = (userData) => dispatch => {
    axios.post('/api/bank/createBankAc', userData)
    .then(res => {
        console.log('Bank Acc created');
    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }) 
    );
};

// Check Bank Balance
export const checkBalance = (userData) => dispatch => {
    axios.post('/api/bank/balance', userData)
    .then(res => {
        dispatch({
            type: GET_BALANCE,
            payload: res.data
        }) 
    })
    .catch(err => 
        console.log('Error')
    );
};

// Check balance and Create Order

export const requestOrder = (userData, history) => dispatch => {
    axios.post('/api/bank/requestOrder', userData)
    .then(res => {
        if(res.data.ok === 'true'){
            dispatch({
                type: GET_ORDER,
                payload: res.data.order
            });
            history.push('/dashboard');
        } else if(res.data.ok === 'wPass') {
            window.alert('Invalid information. Try again!');
        } else {
            window.alert('Insufficient balance');
        }
    })
    .catch(err => 
        // dispatch({
        //     type: GET_ERRORS,
        //     payload: err.response.data
        // }) 
        console.log('Error during placing order')
    );
};