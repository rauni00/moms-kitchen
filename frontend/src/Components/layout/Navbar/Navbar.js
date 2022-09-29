import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { logoutUser } from '../../action/authActions';
import { clearCurrentProfile } from '../../action/profileAction';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
export class Navbar extends React.Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.clearCurrentProfile();
		this.props.logoutUser();
		this.props.history.push('/login');
	}
	render() {
		const { isAuthenticated } = this.props.auth;

		const guestUser = (
			<>
				<li className="nav-item">
					<Link className="nav-link" to="/AboutUs">
						About Us
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/ContactUs">
						Contact Us
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/Register">
						SignUp
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/Login">
						Login
					</Link>
				</li>
			</>
		);
		const loginUser = (
			<>
				<li className="nav-item ">
					<Link className="nav-link " to="/dashboard">
						Dashboard
					</Link>
				</li>

				<li className="nav-item ">
					<Link className="nav-link " to="/cart">
						<i className="fas fa-shopping-cart"></i>
						Cart
					</Link>
				</li>
				<li className="nav-item">
					<div
						style={{ cursor: 'pointer' }}
						onClick={this.onLogoutClick.bind(this)}
						className="nav-link"
					>
						Logout
					</div>
				</li>
			</>
		);
		return (
			<>
				<nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
					<div className="container">
						<Link className="navbar-brand" to="/">
							<i id="logoIcon" className="fas fa-utensils"></i>
							Mom's Kitchen
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#mobile-nav"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div id="allList" className="nav-item navbar-nav mi-auto p-auto">
							<div className="collapse navbar-collapse " id="mobile-nav">
								<ul className="navbar-nav" id="navItems">
									<li className="nav-item ">
										<Link className="nav-link" to="/">
											Home
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to="/Menu">
											Menu
										</Link>
									</li>
									{isAuthenticated ? loginUser : guestUser}
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
