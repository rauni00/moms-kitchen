import './App.css';
import AddCategory from './Admin/Category/AddCategory';
import Admin from './Admin/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dishes from './Admin/Dish/Dishes';
import ContactUs from './Components/ContactUs/ContactUs';
import Footer from './Components/layout/Footer/Footer';
import Navbar from './Components/layout/Navbar/Navbar';
import AboutUs from './Components/AboutUs/AboutUs';
import Menu from './Components/Menu/Menu';
import Register from './Components/auth/Register/Register';
import { Provider } from 'react-redux';
import store from './store';
import Login from './Components/auth/Login/Login';
import Landing from './Components/layout/Landing-page/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import ExtraDetails from './Components/auth/Register/ExtraDetails';
import setAuthToken from './Components/utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './Components/action/authActions';
import PrivateRoute from './Components/auth/PrivateRoute';
import Cart from './Components/Cart/Cart';
import authAdmin from './Admin/authAdmin';
import EditProfile from './Components/Dashboard/EditProfile';
// import Navbar2 from './Components/layout/Navbar/Navbar2';
if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decode = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decode));
	const currentTime = Date.now() / 1000;
	if (decode.exp < currentTime) {
		store.dispatch(logoutUser());
		// this.props.history.push('/login');
		window.location.href = '/login';
	}
}
function App() {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Navbar />
					{/* <Navbar2 /> */}
					<div>
						{/* Admin Routes */}
						<Route exact path="/AddCategory" component={AddCategory}></Route>
						<Route exact path="/adminMoms" component={Admin}></Route>
						<Route exact path="/authAdmin" component={authAdmin}></Route>
						<Route exact path="/dishes/:id/:name" component={Dishes}></Route>
					</div>
					{/* Frontend Routes */}
					<Route exact path="/" component={Landing}></Route>
					<Route exact path="/Register" component={Register}></Route>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/ContactUs" component={ContactUs}></Route>
					<Route exact path="/editProfile" component={EditProfile}></Route>
					<Route exact path="/AboutUs" component={AboutUs}></Route>
					<Route exact path="/Menu" component={Menu}></Route>
					<Route exact path="/extraDetails" component={ExtraDetails}></Route>
					<Switch>
						<PrivateRoute exact path="/dashboard" component={Dashboard} />
						<PrivateRoute exact path="/cart" component={Cart}></PrivateRoute>
					</Switch>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;
