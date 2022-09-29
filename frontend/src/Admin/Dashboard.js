import React from 'react';
import axios from 'axios';
import AddCategory from './Category/AddCategory';
import Editcategory from './Category/EditCategory';
import { Link } from 'react-router-dom';
import Spinner from '../Components/layout/Spinner/Spinner';
export class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			allCategory: [],
			isTrue: true,
			editTrue: true,
			editingID: '',
			spinner: true,
		};
		document.title = 'Admin Page';
		this.AddCategory = this.AddCategory.bind(this);
		this.editCategory = this.editCategory.bind(this);
		this.UpdateCategory = this.UpdateCategory.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.UpdateEdit = this.UpdateEdit.bind(this);
		this.DeleteCategory = this.DeleteCategory.bind(this);
	}
	componentDidMount() {
		axios.get('/api/category/all')
			.then((res) => {
				this.setState({ allCategory: res.data });
				setTimeout(() => {
					this.setState({ spinner: false });
				}, 500);
			})
			.catch((err) => console.log(err));
	}

	DeleteCategory(id) {
		axios.delete(`/api/category/delete/${id}`)
			.then((res) => {
				if (window.confirm('Are you sure? This can Not be Undone!')) {
					this.setState({ allCategory: res.data });
				}
			})
			.catch((err) => console.log(err));
	}

	onCancel() {
		this.setState({ isTrue: true, editTrue: true });
	}
	AddCategory() {
		this.setState({ isTrue: false });
	}
	editCategory(id) {
		this.setState({ editTrue: false, editingID: id });
	}

	UpdateCategory(updated, hide) {
		this.setState({ allCategory: updated, isTrue: hide });
	}
	UpdateEdit(updated, hide) {
		this.setState({ allCategory: updated, editTrue: hide });
	}

	render() {
		const { allCategory, spinner } = this.state;
		return (
			<div className="container">
				<h1>Admin Page</h1>

				{spinner ? (
					<div className="mt-5 m-1 d-flex align-items-center justify-content-center mb-5">
						<Spinner />
					</div>
				) : (
					<div className="row">
						<div className="col-lg-12 col-md-8  m-auto">
							{!this.state.isTrue && (
								<AddCategory
									UpdateCategory={this.UpdateCategory}
									onCancel={this.onCancel}
								/>
							)}
							{!this.state.editTrue && (
								<Editcategory
									id={this.state.editingID}
									UpdateEdit={this.UpdateEdit}
									onCancel={this.onCancel}
								/>
							)}

							{this.state.isTrue && (
								<button
									onClick={this.AddCategory}
									className="btn btn-success mt-3"
								>
									Add Category
								</button>
							)}

							<table className="table col-sm-8">
								<thead>
									<tr>
										<th scope="col">Category Name</th>
										<th scope="col">Image</th>
									</tr>
								</thead>
								<tbody>
									{allCategory.map((item) => (
										<tr>
											<td className="h6">{item.name}</td>
											<td>
												<img
													style={{
														width: 120,
														height: 120,
														borderRadius: 20,
													}}
													src={item.image}
													alt="Category"
												/>
											</td>
											<button
												onClick={this.editCategory.bind(
													this,
													item._id
												)}
												className="btn btn-primary bg-primary m-2 "
											>
												Edit Category
											</button>
											<button
												onClick={this.DeleteCategory.bind(
													this,
													item._id
												)}
												className="btn btn-danger bg-danger m-2"
											>
												Delete
											</button>

											<Link
												to={`/dishes/${item._id}/${item.name}`}
												className="btn btn-success bg-success"
											>
												Go to Dishes
											</Link>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default Dashboard;
