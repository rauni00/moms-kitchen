import React from 'react';
import { editProfile } from '../action/profileAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

export class EditProfile extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			phonenumber: '',
			Country: '',
			Address: '',
			errors: {},
		};
		this.Submit = this.Submit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount() {
		const { name, email, phonenumber, Country, Address } = this.props.profile;
		this.setState({
			name: name,
			email: email,
			phonenumber: phonenumber,
			Country: Country,
			Address: Address,
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			console.log(nextProps.errors);
			this.setState({ errors: nextProps.errors });
		}
	}
	Submit(e) {
		e.preventDefault();
		const editedProfile = {
			name: this.state.name,
			email: this.state.email,
			phonenumber: this.state.phonenumber,
			Country: this.state.Country,
			Address: this.state.Address,
		};
		this.props.editProfile(editedProfile);
		this.props.profileShow();

		console.log(editedProfile);
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	render() {
		const { name, email, phonenumber, Country, Address, errors } = this.state;
		return (
			<div>
				<div className="container rounded bg-white mb-5">
					<div className="row d-flex justify-content-center">
						<div className="col-md-6">
							<div className="p-3 ">
								<div className="d-flex justify-content-between align-items-center mb-3">
									<h4 className="text-right">Edit Profile</h4>
								</div>
								<form onSubmit={this.Submit} className="form-group">
									<div className="row mt-2">
										<div className="">
											<input
												onChange={this.onChange}
												type="text"
												className={classnames('form-control', {
													'is-invalid m-0': errors.name,
												})}
												placeholder="Name"
												name="name"
												value={name}
											/>
											{errors.name && (
												<div className="invalid-feedback mb-2">
													{errors.name}
												</div>
											)}
										</div>
									</div>
									<div className="col-md-12">
										<input
											value={email}
											onChange={this.onChange}
											type="email"
											name="email"
											className="form-control mb-0"
											placeholder="Email"
											disabled
										/>
									</div>
									<small className="text-danger">
										You can't change your email
									</small>
									<div className="row mt-3">
										<div className="col-md-12">
											<input
												onChange={this.onChange}
												type="text"
												className={classnames('form-control ', {
													'is-invalid m-0':
														errors.phonenumber,
												})}
												placeholder="Mobile Number"
												name="phonenumber"
												value={phonenumber}
											/>
											{errors.phonenumber && (
												<div className="invalid-feedback mb-2">
													{errors.phonenumber}
												</div>
											)}
										</div>
									</div>
									<div className="row ">
										<div className="">
											<input
												value={Country}
												onChange={this.onChange}
												type="text"
												name="Country"
												className={classnames('form-control ', {
													'is-invalid m-0': errors.Country,
												})}
												placeholder="country"
											/>
											{errors.Country && (
												<div className="invalid-feedback mb-2">
													{errors.Country}
												</div>
											)}
										</div>
									</div>
									<div className="col-md-12">
										<input
											onChange={this.onChange}
											type="text"
											value={Address}
											className={classnames('form-control ', {
												'is-invalid m-0': errors.Address,
											})}
											placeholder="Address"
											name="Address"
										/>
										{errors.Address && (
											<div className="invalid-feedback mb-2">
												{errors.Address}
											</div>
										)}
									</div>
									<div className="text-center">
										<button
											className="btn btn-primary profile-button"
											type="submit"
										>
											Save Profile
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditProfile.propTypes = {
	editProfile: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	errors: state.errors,
});
export default connect(mapStateToProps, { editProfile })(EditProfile);
