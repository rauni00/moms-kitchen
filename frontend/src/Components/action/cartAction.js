import axios from 'axios';
import { ADD_TO_CART, CART_LOADING, DELETE_CART_ITEM, GET_CART_ITEM } from './types';

export const addToCart = (dish) => (dispatch) => {
	axios.post('/api/cart/', dish)
		.then((res) =>
			dispatch({
				type: ADD_TO_CART,
				payload: res.data,
			})
		)
		.catch((err) => console.log(err));
};

export const getCartItem = () => (dispatch) => {
	dispatch(cartLoading());
	axios.get('/api/cart/cartDish').then((res) => {
		dispatch({
			type: GET_CART_ITEM,
			payload: res.data,
		});
	});
};

export const cartLoading = () => {
	return {
		type: CART_LOADING,
	};
};
export const deleteCartItem = (id) => (dispatch) => {
	axios.delete(`/api/cart/delete/${id}`).then((res) => {
		dispatch({
			type: DELETE_CART_ITEM,
			payload: res.data,
		});
	});
};
