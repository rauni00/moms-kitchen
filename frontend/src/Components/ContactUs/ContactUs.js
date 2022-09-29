/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Spinner from '../layout/Spinner/Spinner';
import './ContactUs.css';
import swal from 'sweetalert';

export class ContactUs extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
		};
		document.title = 'Contact Us';
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1500);
	}
	Submit(e) {
		e.preventDefault();
		console.log(e.target.value);
		swal({
			icon: 'success',
			text: 'Message send to the Admin',
		}).then(() => {
			window.location.href = '/';
		});
	}
	render() {
		const { loading } = this.state;
		return (
			<div>
				{loading ? (
					<Spinner />
				) : (
					<section id="contact">
						<div className="contact-box">
							<div className="contact-links">
								<h2>CONTACT US</h2>
								<div className="links">
									<div className="link">
										<a>
											<img
												id="img"
												src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
												alt="linkedin"
											/>
										</a>
									</div>
									<div className="link">
										<a>
											<img
												id="img"
												src="https://i.postimg.cc/YCV2QBJg/github.png"
												alt="github"
											/>
										</a>
									</div>
									<div className="link">
										<a>
											<img
												id="img"
												src="https://i.postimg.cc/W4Znvrry/codepen.png"
												alt="codepen"
											/>
										</a>
									</div>
									<div className="link">
										<a>
											<img
												id="img"
												src="https://i.postimg.cc/NjLfyjPB/email.png"
												alt="email"
											/>
										</a>
									</div>
								</div>
							</div>
							<div className="contact-form-wrapper">
								<form onSubmit={this.Submit.bind(this)}>
									<div className="form-item">
										<input type="text" name="name" required />
										<label>Name:</label>
									</div>
									<div className="form-item">
										<input type="text" name="email" required />
										<label>Email:</label>
									</div>
									<div className="form-item">
										<textarea
											className=""
											name="message"
											required
										></textarea>
										<label>Message:</label>
									</div>
									<button className="submit-btn">Send</button>
								</form>
							</div>
						</div>
					</section>
				)}
			</div>
		);
	}
}

export default ContactUs;
