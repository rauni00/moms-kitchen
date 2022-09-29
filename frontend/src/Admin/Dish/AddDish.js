import axios from 'axios';
import React from 'react';

export class AddDish extends React.Component {
	constructor() {
		super();
		this.state = {
			title: '',
			price: '',
			description: '',
			image: '',
			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		const newDish = {
			title: this.state.title,
			description: this.state.description,
			price: this.state.price,
			image: this.state.image,
		};
		axios.post(`/api/dish/add/${this.props.name}`, newDish)
			.then((res) => this.props.AddDish(res.data, true))
			.catch((err) => this.setState({ errors: err.response.data }));
	}
	render() {
		const { errors } = this.state;
		return (
			<div>
				<div className="row">
					<div className="col-lg-6">
						<h1>Add Dishes</h1>
						<form onSubmit={this.onSubmit}>
							<div className="form-group mb-2">
								{errors.title && (
									<small className="text-danger">{errors.title}</small>
								)}
								<input
									placeholder="Title"
									value={this.state.title}
									onChange={this.onChange}
									type="text"
									className="form-control"
									id="title"
									name="title"
								/>
							</div>
							<div className="form-group mb-2">
								{errors.price && (
									<small className="text-danger">{errors.price}</small>
								)}
								<input
									placeholder="Price"
									value={this.state.price}
									onChange={this.onChange}
									type="number"
									className="form-control"
									name="price"
								/>
							</div>
							<div className="form-group mb-2">
								{errors.image && (
									<small className="text-danger">{errors.image}</small>
								)}
								<input
									placeholder="Image Url"
									value={this.state.image}
									onChange={this.onChange}
									type="url"
									className="form-control"
									name="image"
								/>
							</div>
							<div className="form-group">
								{errors.description && (
									<small className="text-danger">
										{errors.description}
									</small>
								)}
								<textarea
									placeholder="Description"
									value={this.state.description}
									onChange={this.onChange}
									className="form-control"
									name="description"
									id="description"
								/>
							</div>
							<button type="submit" className="btn btn-success m-2">
								Add Dish
							</button>
							<button onClick={this.props.onCancel} className="btn btn-danger">
								Cancel
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddDish;
