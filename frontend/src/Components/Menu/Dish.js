import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../action/cartAction';
import swal from 'sweetalert';
export class Dish extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allDish: [],
		};
	}
	componentDidMount() {
		axios.get(`/api/dish/get/${this.props.categoryName}`)
			.then((res) => {
				if (res.data === 'Dish not found') {
					this.setState({ errors: 'Dish not found' });
				} else {
					this.setState({ allDish: res.data.Dish });
				}
			})

			.catch((err) => {
				console.log(err);
			});
	}
	componentWillReceiveProps(NextProps) {
		axios.get(`/api/dish/get/${NextProps.categoryName}`)
			.then((res) => {
				if (res.data === 'Dish not found') {
					this.setState({ errors: 'Dish not found' });
				} else {
					this.setState({ allDish: res.data.Dish });
				}
			})

			.catch((err) => {
				console.log(err);
			});
	}
	AddCart(title, description, price, image) {
		if (!this.props.auth.isAuthenticated) {
			swal({
				icon: 'info',
				text: 'Login is Required to Add',
			}).then(() => this.props.history.push('/login'));
		}
		if (this.props.auth.isAuthenticated) {
			const distItem = {
				title: title,
				price: price,
				description: description,
				image: image,
			};
			swal(`${title} is added in your cart`);
			this.props.addToCart(distItem);
		}
	}
	render() {
		const { allDish } = this.state;
		return (
			<div>
				<div className="row ">
					{allDish.map((items) => (
						<div className="col-lg-3 col-md-4 col-sm-6 mt-2">
							<div className="card">
								<img
									style={{ width: 'auto', height: 180 }}
									className="card-img-top"
									src={items.image}
									alt="Card"
								/>
								<div className="card-body">
									<h6 className="card-title">
										Title : <strong>{items.title}</strong>
									</h6>
									<h6 className="card-title">
										Price:
										<span
											style={{
												color: '#04aa6d',
												fontSize: 15,
											}}
										>
											{items.price}
										</span>
									</h6>

									<p className="card-text">
										Description: {items.description}
									</p>
									<button
										onClick={this.AddCart.bind(
											this,
											items.title,
											items.description,
											items.price,
											items.image
										)}
										className="btn btn-primary m-2"
									>
										<i className="fas fa-shopping-cart 	"></i>
										Add To Cart
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

Dish.propTypes = {
	auth: PropTypes.object.isRequired,
	addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addToCart })(withRouter(Dish));
// export default Dish;
