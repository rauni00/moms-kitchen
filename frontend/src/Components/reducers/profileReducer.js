/* eslint-disable import/no-anonymous-default-export */
import { GET_PROFILE, CLEAR_CURRENT_PROFILE, PROFILE_LOADING } from '../action/types';
const initialState = {
	profile: null,
	loading: false,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false,
			};
		case PROFILE_LOADING:
			return {
				...state,
				loading: true,
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				profile: null,
			};
		default:
			return state;
	}
}
