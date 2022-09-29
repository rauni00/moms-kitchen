import axios from 'axios';
import React from 'react';
import AddDish from './AddDish';
import FadeLoader from 'react-spinners/FadeLoader';
import EditDish from './EditDish';

export class Dishes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.match.params.name,
			id: this.props.match.params.id,
			allDish: [],
			errors: '',
			spinner: true,
			isAddDishTrue: true,
			isEditDishTrue: false,
			DishId: {},
		};
		this.toggleAdd = this.toggleAdd.bind(this);
		this.DeleteDish = this.DeleteDish.bind(this);
		document.title = this.state.name;
	}

	componentDidMount() {
		axios.get(`/api/dish/get/${this.state.name}`)
			.then((res) => {
				if (res.data === 'Dish not found') {
					this.setState({ errors: 'Dish not found' });
					setTimeout(() => {
						this.setState({ spinner: false });
					}, 1000);
				} else {
					this.setState({ allDish: res.data.Dish });
					setTimeout(() => {
						this.setState({ spinner: false });
					}, 500);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}
	DeleteDish(id) {
		axios.delete(`/api/dish/delete/${this.state.name}/${id}`)
			.then((res) => {
				this.setState({ allDish: res.data });
			})
			.catch((err) => console.log(err));
	}
	AddDish(dish, hide) {
		this.setState({ allDish: dish, isAddDishTrue: hide });
	}
	UpdateDish(updated, hide) {
		this.setState({ allDish: updated, isEditDishTrue: hide });
	}

	toggleAdd() {
		this.setState({ isAddDishTrue: false });
	}
	onCancel() {
		this.setState({ isAddDishTrue: true, isEditDishTrue: false });
	}
	EditDish(id) {
		this.setState({ DishId: id, isEditDishTrue: true, isAddDishTrue: true });
	}
	render() {
		const { name, errors, allDish, spinner, isAddDishTrue, isEditDishTrue, DishId } =
			this.state;
		return (
			<div className="container">
				<h2 style={{ color: 'black' }}> Dishes of Category {name}</h2>
				{spinner ? (
					<div className="mt-5 m-1 d-flex align-items-center justify-content-center">
						<FadeLoader color="#15dee5" />
						<span style={{ fontSize: 20 }}>Loading.......</span>
					</div>
				) : (
					<>
						{!isAddDishTrue && (
							<AddDish
								name={name}
								AddDish={this.AddDish.bind(this)}
								onCancel={this.onCancel.bind(this)}
							/>
						)}
						{isEditDishTrue && (
							<EditDish
								id={DishId}
								name={name}
								UpdateDish={this.UpdateDish.bind(this)}
								onCancel={this.onCancel.bind(this)}
							/>
						)}
						{isAddDishTrue && (
							<button onClick={this.toggleAdd} className="btn btn-success">
								Add Dish
							</button>
						)}
						<br />
						<div className="container">
							{errors && <h5 className="text-danger">{errors}</h5>}
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
													Title : <span>{items.title}</span>
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
													onClick={this.EditDish.bind(
														this,
														items._id
													)}
													className="btn btn-primary m-2"
												>
													Edit
												</button>
												<button
													onClick={this.DeleteDish.bind(
														this,
														items._id
													)}
													className="btn btn-danger"
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		);
	}
}

export default Dishes;
