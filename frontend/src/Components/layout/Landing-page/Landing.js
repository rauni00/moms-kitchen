import React from 'react';
import './Landing.css';
import LandingImage from '../../Image/landingImage.jpg';
import Biryani from '../../Image/Biryani.jpg';
import momos from '../../Image/momos.jpg';
import { Link } from 'react-router-dom';
export class Landing extends React.Component {
	constructor() {
		super();
		this.state = {
			landImg: LandingImage,
		};
		document.title = "Mom's Kitchen";
	}
	render() {
		return (
			<div className="#">
				<div className="main">
					<div className="imageText">
						Get Your
						<br /> Food Now
						<br />
						<Link to="Menu">
							<button id="findBtn" className="btn btn-primary">
								Order Now
							</button>
						</Link>
					</div>
					<img
						src={this.state.landImg}
						className="img-fluid"
						alt="Food"
						style={{
							maxWidth: '100%',
							maxHeight: '50%',
							overflow: 'scroll',
							minWidth: '100%',
						}}
					/>
				</div>
				<section
					id="gtco-special-dishes"
					className="container  section-padding mt-5 mb-5"
				>
					<div className="">
						<div className="section-content">
							<div className="heading-section text-center">
								<h1>Special Dishes</h1>
							</div>
							<div className="row mt-5">
								<div className="col-lg-5 col-md-6 col-sm-6 align-self-center">
									<div className="dishes-text">
										<h3>Biryani</h3>
										<p className="pt-3 ">
											Serving deliciousness for over a decade,
											Biryanis and More has struck a chord with
											gourmets across the world. Based in
											Goarkhpur, the chain of restaurants has
										</p>
										<h3 className="special-dishes-price">Rs.*150</h3>
									</div>
								</div>
								<div className="col-lg-5 offset-lg-2 col-md-6 col-sm-6 align-self-center mt-4 mt-md-0">
									<img
										style={{ borderRadius: 15 }}
										src={Biryani}
										alt=""
										className="img-fluid shadow w-100"
									/>
								</div>
							</div>
							<div className="row mt-5">
								<div className="col-lg-5 col-md-6 col-sm-6 align-self-center order-2 order-md-1 mt-4 mt-md-0">
									<img
										style={{ borderRadius: 15 }}
										src={momos}
										alt=""
										className="img-fluid shadow w-100"
									/>
								</div>
								<div className="col-lg-5 offset-lg-2 col-md-6 col-sm-6 align-self-center order-1 order-md-2 py-5">
									<div className="dishes-text">
										<h3>Momos</h3>
										<p className="pt-3">
											Making way for a hearty meal is Spicy Momo
											Restaurant in Gorakhpur. This place is
											synonymous with delicious food that can
											satiate all food cravings.
										</p>
										<h3 className="special-dishes-price">Rs.*75</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Landing;
