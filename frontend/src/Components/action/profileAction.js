import axios from 'axios';
import { CLEAR_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE, PROFILE_LOADING } from './types';

export const userCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios.get('/api/users/')
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			})
		)
		.catch((err) => {});
};
// eeeeeeeeeeeeeeeeeeeee
export const editProfile = (editData) => (dispatch) => {
	axios.post('/api/users/editProfile', editData)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
// eeeeeeeeeeeeeeeeeeeee

export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING,
	};
};
//Clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE,
	};
};
