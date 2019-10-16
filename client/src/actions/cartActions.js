import axios from 'axios';

import { GET_TOTAL_ITEM, GET_CART, ADD_ITEM, CART_LOADING, TEST } from './types';


// Get Cart
export const getCart = (history) => dispatch => {
      const url = '/api/customer/shopping-cart';
      axios.get(url)
        .then(res =>{
          //console.log('A');
          dispatch({
            type: GET_CART,
            payload: res.data
          });
          history.push('/cart');
        })
        .catch(err =>
            console.log(err)
        );
};

// Add to Cart
export const addToCart = (id) => dispatch => {
    dispatch(setCartLoading());
    console.log('axios'+id);
      const url = '/api/customer/add-to-cart/' + id;
      axios.get(url)
        .then(res =>{
          //console.log(res.data);
          dispatch({
            type: ADD_ITEM,
            payload: res.data
          })
        })
        .catch(err =>
          dispatch({
            type: ADD_ITEM,
            payload: {}
          })
        );
};
// Get total Cart item
export const getTotalItem = () => dispatch => {
      const url = '/api/customer/totalCartItem';
      axios.get(url)
        .then(res =>
          dispatch({
            type: GET_TOTAL_ITEM,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch({
            type: GET_TOTAL_ITEM,
            payload: {}
          })
        );
};

// Get total Cart item
export const clearMyCart = () => dispatch => {
  const url = '/api/customer/clearCart';
  axios.get(url)
    .then(res =>{
      console.log("Cart cleared successfully");
      window.location.reload()
    }
    )
    .catch(err =>
      console.log("Clear cart Error")
    );
};
  
// Cart loading
export const setCartLoading = () => {
  return {
    type: CART_LOADING
  };
};

// test
export const test = () => dispatch => {
  dispatch({
    type: TEST,
    payload: {test: 'HOHO'}
  });
};