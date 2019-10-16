import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, UPDATE_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/customer/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })    
    );
};

// Login - Get User Token

export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/customer/login', userData)
    .then(res => {
        // save to local storage
        const { token } = res.data;
        // set token to local storage
        localStorage.setItem('jwtToken', token);
        // set token to Auth Header
        setAuthToken(token);
        // decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        //console.log(decoded);
        dispatch(setCurrentUser(decoded));

        history.push('/login');

    })
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
    }));
};

// Register User
export const updateBankInfo = (userData, history) => dispatch => {
    axios.post('/api/customer/updateUser', userData)
    .then(res => {
        history.push('/dashboard');
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        });
    })
    .catch(err => 
        console.log('Error Bank Acc No')
    );
};

// Set logged in use
export const setCurrentUser = decoded => {
    return{
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove the auth header for future requests
    setAuthToken(false);
    // Set current user to { which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    // Redirect to login
    window.location.href = '/login';
};