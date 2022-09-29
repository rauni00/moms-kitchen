import React from 'react';

export class authAdmin extends React.Component {
	constructor() {
		super();
		this.state = {
			password: '',
			error: '',
		};
		this.submit = this.submit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	submit(e) {
		e.preventDefault();
		let adminPass = 'Rauni00';
		if (adminPass === this.state.password) {
			this.props.history.push('/adminMoms');
		} else {
			this.setState({ error: 'Admin password Wrong' });
		}
	}
	onChange(e) {
		this.setState({ password: e.target.value });
	}
	render() {
		return (
			<div className="container mt-5">
				<form onSubmit={this.submit} class="form-inline">
					<div class="form-group mb-2  m-3">Admin Password</div>
					<div class="form-group mx-sm-3 ">
						{this.state.error && (
							<small className="text-danger">{this.state.error}</small>
						)}
						<input
							value={this.state.value}
							onChange={this.onChange}
							type="password"
							class="form-control"
							placeholder="Password"
						/>
					</div>
					<button type="submit" class="btn btn-primary mb-5 m-3">
						Confirm identity
					</button>
				</form>
			</div>
		);
	}
}

export default authAdmin;
