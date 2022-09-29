import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../action/authActions';
import { Link } from 'react-router-dom';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
		};
		document.title = 'Login';
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-6 m-auto shadow-lg p-3 mb-5 bg-white rounded mt-4 ">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to Mom's Kitchen</p>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="email"
										className={classnames('form-control', {
											'is-invalid m-0': errors.email,
										})}
										placeholder="Email Address"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
									/>
									{errors.email && (
										<div className="invalid-feedback mb-2">
											{errors.email}
										</div>
									)}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control', {
											'is-invalid m-0': errors.password,
										})}
										placeholder="Password"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
									/>

									{errors.password && (
										<div className="invalid-feedback mb-2">
											{errors.password}
										</div>
									)}
								</div>
								<input type="submit" className="btn btn-success mt-2" />
							</form>
							<div className="text-muted">
								Don't have a account yet?
								<Link
									to="/Register"
									className="text-primary text-decoration-none"
								>
									SignUp
								</Link>
							</div>
							<div className="text-muted">
								Admin
								<Link
									to="/authAdmin"
									className="text-primary text-decoration-none"
								>
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
