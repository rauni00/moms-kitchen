import axios from 'axios';
import React from 'react';

export class AddCategory extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			image: '',
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.submit = this.submit.bind(this);
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	submit(e) {
		e.preventDefault();
		const newCategory = {
			name: this.state.name,
			image: this.state.image,
		};
		axios.post('/api/category/', newCategory)
			.then((res) => {
				this.props.UpdateCategory(res.data, true);
			})
			.catch((err) => this.setState({ errors: err.response.data }));
	}
	render() {
		const { errors } = this.state;
		return (
			<div>
				<h4>Add category</h4>
				<form onSubmit={this.submit}>
					<div className="form-group mb-3">
						{errors.name && <small className="text-danger">{errors.name}</small>}
						<input
							onChange={this.onChange}
							placeholder="Category Name"
							className="form-control w-auto"
							type="text"
							name="name"
						/>
					</div>
					<div className="form-group">
						{errors.image && (
							<small className="text-danger">{errors.image}</small>
						)}
						{/* <input
							placeholder="Image URL"
							onChange={this.onChange}
							className="form-control w-auto"
							type="file"
							name="image"
						/> */}
						<input
							placeholder="Image URL"
							onChange={this.onChange}
							className="form-control w-auto"
							type="url"
							name="image"
						/>
					</div>
					<button className="btn btn-success mt-2 m-2" type="submit">
						Submit
					</button>
					<button
						type="submit"
						className="btn btn-danger mt-2 m-2"
						onClick={this.props.onCancel}
					>
						Cancel
					</button>
				</form>
			</div>
		);
	}
}

export default AddCategory;
