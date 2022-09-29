/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Dashboard.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userCurrentProfile } from '../action/profileAction';
import Spinner from '../layout/Spinner/Spinner';
import DashboardContent from './DashboardContent';
import CompleteProfile from './CompleteProfile';
export class Dashboard extends React.Component {
	componentDidMount() {
		this.props.userCurrentProfile();
		document.title = 'Dashboard';
	}
	render() {
		const { profile, loading } = this.props.profile;
		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			if (Object.keys(profile).length > 0) {
				dashboardContent = <DashboardContent profile={profile} />;
			}
			if (profile.Address === '') {
				dashboardContent = (
					<>
						<h1>Welcome {profile.name}</h1>
						<CompleteProfile id={profile._id} />
					</>
				);
			}
		}
		return <div className="container">{dashboardContent}</div>;
	}
}
Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	userCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { userCurrentProfile })(Dashboard);
