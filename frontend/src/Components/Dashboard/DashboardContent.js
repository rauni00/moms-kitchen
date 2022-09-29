/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteAccount } from '../action/authActions';
import { clearCurrentProfile } from '../action/profileAction';
import EditProfile from './EditProfile';
export class DashboardContent extends React.Component {
	constructor() {
		super();
		this.state = {
			profileContent: true,
		};
	}
	DeleteAccount() {
		this.props.deleteAccount(this.props.history);
		this.props.clearCurrentProfile();
	}
	editProfile() {
		this.setState({ profileContent: false });
	}
	profileShow() {
		this.setState({ profileContent: true });
	}
	render() {
		const { profile } = this.props;
		const { profileContent } = this.state;
		let content = (
			<div className="row">
				<div className="col-lg-4">
					<div className="card mb-4">
						<div className="card-body text-center">
							<img
								src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
								alt="avatar"
								className="rounded-circle img-fluid"
								style={{ width: '159px' }}
							/>
							<h5 className="my-3">{profile.name}</h5>
							<div className="d-flex justify-content-center mb-0">
								<button
									onClick={this.DeleteAccount.bind(this)}
									type="button"
									className="btn btn-danger"
								>
									Delete Account
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-8">
					<div className="card mb-4">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-3">
									<strong className="mb-0">Full Name</strong>
								</div>
								<div className="col-sm-9">
									<p className="text-muted mb-0">{profile.name}</p>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-3">
									<strong className="mb-0">Email</strong>
								</div>
								<div className="col-sm-9">
									<p className="text-muted mb-0">{profile.email}</p>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-3">
									<strong className="mb-0">Mobile</strong>
								</div>
								<div className="col-sm-9">
									<p className="text-muted mb-0">
										{profile.phonenumber}
									</p>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-3">
									<strong className="mb-0">Country</strong>
								</div>
								<div className="col-sm-9">
									<p className="text-muted mb-0">{profile.Country}</p>
								</div>
							</div>
							<hr />
							<div className="row">
								<div className="col-sm-3">
									<strong className="mb-0">Address</strong>
								</div>
								<div className="col-sm-9">
									<p className="text-muted mb-0">{profile.Address}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
		return (
			<section style={{ backgroundColor: '#eee' }}>
				<div className="container py-3">
					<h1>Welcome {profile.name}</h1>
					<h6>Dashboard</h6>
					<div className="row">
						<nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
							<ol className="breadcrumb mb-0" style={{ cursor: 'pointer' }}>
								<li
									onClick={this.profileShow.bind(this)}
									className="breadcrumb-item active"
									aria-current="page"
								>
									Profile
								</li>
								<li
									onClick={this.editProfile.bind(this)}
									className="breadcrumb-item"
									aria-current="page"
								>
									Edit Profile
								</li>
							</ol>
						</nav>
					</div>
					{profileContent ? (
						content
					) : (
						<EditProfile
							profile={profile}
							profileShow={this.profileShow.bind(this)}
						/>
					)}
				</div>
			</section>
		);
	}
}

DashboardContent.propTypes = {
	deleteAccount: PropTypes.func.isRequired,
	clearCurrentProfile: PropTypes.func.isRequired,
};

export default connect('', { deleteAccount, clearCurrentProfile })(withRouter(DashboardContent));
