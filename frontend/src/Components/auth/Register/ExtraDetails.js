import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { extraDetails } from '../../action/authActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CountrySelector from './CountrySelector';

export class ExtraDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			phonenumber: '',
			Address: '',
			Country: '',
			errors: {},
		};
		document.title = `ExtraDetails`;

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const newUser = {
			phonenumber: this.state.phonenumber,
			Address: this.state.Address,
			Country: this.state.Country,
		};
		this.props.extraDetails(newUser, this.props.history);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	CountrySelect(CountryName) {
		this.setState({ Country: CountryName });
	}

	render() {
		const { errors } = this.state;
		return (
			<div>
				<div className="extraDetails">
					<div className="container">
						<div className="row">
							<div className="col-md-6 m-auto shadow-lg p-3 mb-5 bg-white rounded mt-4 ">
								<h1 className="display-5 text-center mb-5 mt-3">
									User Extra Details
								</h1>

								<form onSubmit={this.onSubmit.bind(this)}>
									<div className="form-group">
										<input
											onChange={this.onChange}
											type="text"
											className={classnames('form-control ', {
												'is-invalid m-0': errors.phonenumber,
											})}
											placeholder="Mobile Number"
											name="phonenumber"
											value={this.state.phonenumber}
										/>
										{errors.phonenumber && (
											<div className="invalid-feedback mb-2">
												{errors.phonenumber}
											</div>
										)}
									</div>
									<div className="form-group">
										<input
											onChange={this.onChange}
											type="text"
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
									<div className="form-group">
										<CountrySelector
											errors={errors.Country}
											CountrySelect={this.CountrySelect.bind(this)}
										/>
									</div>

									<input
										type="submit"
										className="btn btn-success btn-block mt-4"
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ExtraDetails.propTypes = {
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { extraDetails })(withRouter(ExtraDetails));
