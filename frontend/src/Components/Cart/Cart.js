import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCartItem, getCartItem } from '../action/cartAction';
import Spinner from '../layout/Spinner/Spinner';
import './style.css';
import { Link } from 'react-router-dom';
import CartEmpty from './CartEmpty';
import swal from 'sweetalert';

export class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			totalPrice: 0,
			cart: {},
		};
		document.title = 'Cart';
	}
	componentDidMount() {
		this.props.getCartItem();
	}
	componentWillReceiveProps(NextProps) {
		if (NextProps.cart.loading === false) {
			this.setState({ cart: NextProps.cart.cart });
			setTimeout(() => {
				const Total = this.state.cart.dish.reduce(function (prev, cur) {
					const a = parseInt(prev);
					return a + parseInt(cur.price);
				}, 0);
				this.setState({ totalPrice: Total + 40 });
			}, 10);
		}
	}
	deleteItem(id) {
		swal({
			icon: 'success',
			title: 'Deleted',
		});
		this.props.deleteCartItem(id);
	}

	checkOut() {
		swal({
			title: 'Thanks for Checkout',
		});
	}
	render() {
		const { cart, loading } = this.props.cart;
		let cartContent;
		if (loading) {
			cartContent = <Spinner />;
		} else {
			if (cart === null) {
				cartContent = <CartEmpty />;
			} else {
				if (cart.dish.length === 0) {
					cartContent = <CartEmpty />;
				} else {
					cartContent = (
						<>
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
																		{
																			cart
																				.dish
																				.length
																		}
																		items
																	</h6>
																</div>
																<hr className="my-3" />
																{cart.dish.map(
																	(items) => (
																		<div className="row mb-4 d-flex justify-content-between align-items-center">
																			<div className="col-md-2 col-lg-2 col-xl-2">
																				<img
																					src={
																						items.image
																					}
																					className="img-fluid rounded-3"
																					alt="dish"
																				/>
																			</div>
																			<div className="col-md-3 col-lg-3 col-xl-3">
																				<h6 className="text-black">
																					{
																						items.title
																					}
																				</h6>
																				<h6 className="mb-0 text-success">
																					&#8377;
																					{
																						items.price
																					}
																				</h6>
																			</div>

																			<div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
																				<div className="mb-0">
																					{
																						items.description
																					}
																				</div>
																			</div>
																			<div className="col-md-1 col-lg-1 col-xl-1 text-end">
																				<div
																					className="text-muted"
																					style={{
																						cursor: 'pointer',
																					}}
																				>
																					<i
																						onClick={this.deleteItem.bind(
																							this,
																							items._id
																						)}
																						className="fas fa-trash fa-lg text-danger"
																					></i>
																				</div>
																			</div>
																		</div>
																	)
																)}
																<hr className="my-4" />
																<div className="pt-2">
																	<h6 className="mb-0">
																		<Link
																			to="/menu"
																			className="text-body text-decoration-none"
																		>
																			<i className="fas fa-long-arrow-alt-left me-2 " />
																			Back
																			to
																			dish
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
																<div className="mb-4">
																	<h5 className=" d-flex text-uppercase justify-content-between">
																		items
																		<div>
																			Price
																		</div>
																	</h5>
																	{cart.dish.map(
																		(
																			priceDetails
																		) => (
																			<>
																				<h6 className="d-flex justify-content-between">
																					<div>
																						{
																							priceDetails.title
																						}
																					</div>

																					<div>
																						&#8377;
																						{
																							priceDetails.price
																						}
																					</div>
																				</h6>
																			</>
																		)
																	)}
																</div>
																<div className="d-flex justify-content-between">
																	<p>
																		Delivery
																		Charges
																	</p>
																	<p>
																		&#8377;40
																	</p>
																</div>
																<hr className="my-2" />
																<div className="d-flex justify-content-between mb-5">
																	<h5 className="text-uppercase">
																		Total
																		price
																	</h5>

																	<h5 className="text-success">
																		&#8377;
																		{
																			this
																				.state
																				.totalPrice
																		}
																	</h5>
																</div>
																<button
																	onClick={this.checkOut.bind(
																		this
																	)}
																	type="button"
																	className="btn btn-dark btn-block btn-lg"
																	data-mdb-ripple-color="dark"
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
						</>
					);
				}
			}
		}

		return <div>{cartContent}</div>;
	}
}
Cart.propTypes = {
	cart: PropTypes.object.isRequired,
	getCartItem: PropTypes.func.isRequired,
	deleteCartItem: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	cart: state.cart,
});

export default connect(mapStateToProps, { getCartItem, deleteCartItem })(Cart);
