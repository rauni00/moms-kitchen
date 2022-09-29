/* eslint-disable no-unused-vars */
import axios from 'axios';
import { GET_ERRORS, PROFILE_LOADING, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import swal from 'sweetalert';

export const registerUser = (userData, history) => (dispatch) => {
	axios.post('/api/users/register', userData)
		.then((res) => history.push('/extraDetails'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
// Extra Details of user
export const extraDetails = (userData, history) => (dispatch) => {
	axios.post('/api/users/extraDetails', userData)
		.then((res) => {
			swal('Good job!', 'Your Account Created Successfully!', 'success');
			history.push('/login');
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};
// Extra Details of user
export const completeProfile = (userData, id) => (dispatch) => {
	axios.post(`/api/users/completeProfile/${id}`, userData)
		.then((res) => {
			window.location.href = '/dashboard';
			// history.push('/Dashboard');
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const loginUser = (userData) => (dispatch) => {
	axios.post('/api/users/testLogin', userData)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//delete user
export const deleteAccount = (history) => (dispatch) => {
	if (window.confirm("Are you sure? This can't be Undone!")) {
		axios.delete('/api/users/delete')
			.then((res) => {
				dispatch({
					type: SET_CURRENT_USER,
					payload: {},
				});
			})
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data,
				})
			);
	}
	return {
		type: PROFILE_LOADING,
	};
};

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

//  Log user out
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
};
