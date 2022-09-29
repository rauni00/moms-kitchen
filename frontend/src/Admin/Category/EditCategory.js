import axios from 'axios';
import React from 'react';

export class EditCategory extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			image: '',
			errors: {},
		};
	}
	componentDidMount() {
		axios.get(`/api/category/get/${this.props.id}`)
			.then((res) => {
				this.setState({ name: res.data.name, image: res.data.image });
			})
			.catch((err) => {
				console.log(err);
			});
	}
	componentWillReceiveProps(NextProps) {
		axios.get(`/api/category/get/${NextProps.id}`)
			.then((res) => {
				this.setState({ name: res.data.name, image: res.data.image });
			})
			.catch((err) => {
				console.log(err);
			});
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	submit(e) {
		e.preventDefault();
		const editedCategory = {
			name: this.state.name,
			image: this.state.image,
		};
		axios.post(`/api/category/edit/${this.props.id}`, editedCategory)
			.then((res) => {
				console.log(res);
				this.props.UpdateEdit(res.data, true);
			})
			.catch((err) => this.setState({ errors: err.response.data }));
	}
	render() {
		const { errors } = this.state;
		return (
			<div>
				<h4>Edit Category</h4>
				<form onSubmit={this.submit.bind(this)}>
					<div className="form-group mb-3">
						{errors.name && <small className="text-danger">{errors.name}</small>}
						<input
							value={this.state.name}
							onChange={this.onChange.bind(this)}
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
						<input
							placeholder="Image URL"
							onChange={this.onChange.bind(this)}
							className="form-control w-auto"
							type="url"
							name="image"
							value={this.state.image}
						/>
					</div>
					<button className="btn btn-success mt-2 m-2" type="submit">
						Submit
					</button>
					<button
						type="submit"
						className="btn btn-danger mt-2 m-2"
						onClick={this.props.onCancel.bind(this)}
					>
						Cancel
					</button>
				</form>
			</div>
		);
	}
}
export default EditCategory;
