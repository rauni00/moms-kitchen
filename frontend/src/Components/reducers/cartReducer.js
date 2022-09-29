/* eslint-disable import/no-anonymous-default-export */
import { ADD_TO_CART, CART_LOADING, DELETE_CART_ITEM, GET_CART_ITEM } from '../action/types';
const initialState = {
	loading: false,
	cart: null,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				cart: action.payload,
			};
		case GET_CART_ITEM:
			return {
				...state,
				cart: action.payload,
				loading: false,
			};
		case CART_LOADING:
			return {
				...state,
				loading: true,
			};
		case DELETE_CART_ITEM:
			return {
				...state,
				cart: action.payload,
			};

		default:
			return state;
	}
}
