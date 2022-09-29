import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	cart: cartReducer,
	profile: profileReducer,
});
