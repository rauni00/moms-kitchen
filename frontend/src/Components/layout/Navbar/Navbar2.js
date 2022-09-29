import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar2 extends Component {
	// var navLinks=document.querySelectorAll('.nav-item')
	// 	let navLinks = document.querySelectorAll('.nav-item')
	// let menuToggle = document.getElementById('navbarSupportedContent')
	// let bsCollapse = new bootstrap.Collapse(menuToggle)
	// navLinks.forEach((l) => {
	//     l.addEventListener('click', () => { bsCollapse.toggle() })
	// })
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">
						Navbar w/ text
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/menu">
									menu <span className="sr-only">(current)</span>
								</Link>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Features
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Pricing
								</a>
							</li>
						</ul>
						<span className="navbar-text">
							Navbar text with an inline element
						</span>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar2;
