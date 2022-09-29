import React from 'react';
import { Link } from 'react-router-dom';

export class CartEmpty extends React.Component {
	constructor() {
		super();
		document.title = 'CartEmpty';
	}
	render() {
		return (
			<section className="h-100 h-custom shadow">
				<div className="container py-3 ">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12">
							<div
								className="card card-registration card-registration-2"
								style={{ borderRadius: '12px' }}
							>
								<div className="card-body p-0">
									<div className="row g-0">
										<div className="col-lg-8">
											<div className="p-5">
												<div className="d-flex justify-content-between align-items-center mb-5">
													<h1 className="fw-bold mb-0 text-black">
														Dish Cart
													</h1>
													<h6 className="mb-0 text-muted">
														0 items
													</h6>
												</div>
												<hr className="my-4 mt-0" />

												<h1>Cart is Empty</h1>
												<Link
													to="/menu"
													className="btn btn-primary mt-3"
												>
													Add Dish
												</Link>
												<hr className="my-4 mt-4" />
												<div className="pt-2">
													<h6 className="mb-0">
														<Link
															to="/menu"
															className="text-body text-decoration-none"
														>
															<i className="fas fa-long-arrow-alt-left me-2 " />
															Back to dish
														</Link>
													</h6>
												</div>
											</div>
										</div>
										<div className="col-lg-4 bg-grey">
											<div className="p-5">
												<h3 className="fw-bold mb-5 mt-2 pt-1">
													Summary
												</h3>
												<hr className="my-4" />
												<div className="  mb-4">
													<h5 className=" d-flex text-uppercase justify-content-between">
														items
														<div>Price</div>
													</h5>
												</div>

												<hr className="my-4" />
												<div className="d-flex justify-content-between mb-5">
													<h5 className="text-uppercase">
														Total price
													</h5>
													<h5>&#8377;0</h5>
												</div>
												<button
													type="button"
													className="btn btn-dark btn-block btn-lg"
													data-mdb-ripple-color="dark"
													disabled
												>
													CHECKOUT
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default CartEmpty;
