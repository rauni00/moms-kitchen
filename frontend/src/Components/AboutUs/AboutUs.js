import React from 'react';
import Spinner from '../layout/Spinner/Spinner';
import about from '../Image/about.jpg';
import panir from '../Image/panir.jpg';
import rahul from '../Image/rahul.jpg';
import papa from '../Image/papa.jpg';
import invest from '../Image/invest.jpg';
import mummy from '../Image/mummy.jpeg';
export class AboutUs extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: true,
		};
		document.title = 'About Us';
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 1500);
	}
	render() {
		const { loading } = this.state;
		return (
			<div className="container">
				{loading ? (
					<Spinner />
				) : (
					<>
						<div className="row">
							<div className="col-sm-5 col-md img-bg d-flex  align-items-center justify-content-center justify-content-md-end img-2 img-fluid">
								<img className="img-fluid" src={about} alt="" />
							</div>
							<div className="col-sm-7 py-5 pl-md-0 pl-4">
								<div className="heading-section pl-lg-5 ml-md-5">
									<span className="subheading">About</span>
									<h2 style={{ color: 'black' }}>Welcome to Resto</h2>
								</div>
								<div className="pl-lg-5 ml-md-5">
									<p>
										On her way she met a copy. The copy warned the
										Little Blind Text, that where it came from it
										would have been rewritten a thousand times and
										everything that was left from its origin would be
										the word "and" and the Little Blind Text should
										turn around and return to its own, safe country. A
										small river named Duden flows by their place and
										supplies it with the necessary regelialia. It is a
										paradisematic country, in which roasted parts of
										sentences fly into your mouth.
									</p>
									<h3 className="mt-5">Special Recipe</h3>
									<div className="row">
										<div className="col-4">
											<div>
												<img
													className="img-fluid"
													src="https://www.teaforturmeric.com/wp-content/uploads/2020/11/Pakistani-Chicken-Biryani-2-e1608874346462.jpg"
													alt=""
												/>
												<h6>Chiken Biryani</h6>
											</div>
										</div>
										<div className="col-4">
											<div>
												<img
													className="img-fluid img-cover"
													src="https://www.acouplecooks.com/wp-content/uploads/2022/04/Greek-Pizza-with-Feta-009.jpg"
													alt=""
												/>
												<h6>Pizza</h6>
											</div>
										</div>
										<div className="col-4">
											<div>
												<img
													className="img-fluid img-cover"
													src={panir}
													alt=""
												/>
												<h6>Panir Tikka</h6>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<section className="team text-center py-5">
							<div className="container">
								<div className="header my-5">
									<h1>Meet our Team </h1>
									<p className="text-muted">
										Meet and Greet our Team Members
									</p>
								</div>
								<div className="row">
									<div className="col-md-6 col-lg-3">
										<div className="img-block mb-5">
											<img
												src={papa}
												className="img-fluid  img-thumbnail rounded-circle"
												alt="image1"
											/>
											<div className="content mt-2">
												<h4>Rajnath Prasad</h4>
												<p className="text-muted">
													Founder & CEO
												</p>
											</div>
										</div>
									</div>
									<div className="col-md-6 col-lg-3 ">
										<div className="img-block mb-5">
											<img
												src={mummy}
												className="img-fluid  img-thumbnail rounded-circle"
												alt="image1"
											/>
											<div className="content mt-2">
												<h4>Urmila Devi</h4>
												<p className="text-muted">
													Cooking Master
												</p>
											</div>
										</div>
									</div>
									<div className="col-md-6 col-lg-3">
										<div className="img-block mb-5">
											<img
												src={rahul}
												className="img-fluid  img-thumbnail rounded-circle"
												alt="image1"
											/>
											<div className="content mt-2">
												<h4>Rahul Rauniyar</h4>
												<p className="text-muted">Developer</p>
											</div>
										</div>
									</div>
									<div className="col-md-6 col-lg-3">
										<div className="img-block mb-5">
											<img
												src={invest}
												className="img-fluid  img-thumbnail rounded-circle"
												alt="image1"
											/>
											<div className="content mt-2">
												<h4>Pritam & Prince</h4>
												<p className="text-muted">
													Managing Director
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</>
				)}
			</div>
		);
	}
}

export default AboutUs;
