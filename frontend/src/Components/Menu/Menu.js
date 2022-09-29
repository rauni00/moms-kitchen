import axios from 'axios';
import React from 'react';
import Slider from './Slider';
import './Menu.css';
import Dish from './Dish';
import Spinner from '../layout/Spinner/Spinner';

export class Menu extends React.Component {
	constructor() {
		super();
		this.state = {
			allCategory: [],
			categoryName: '',
			spinner: true,
			dish: false,
		};
		document.title = 'Menu';
	}
	componentDidMount() {
		axios.get('/api/category/all')
			.then((res) => {
				this.setState({ allCategory: res.data });
				this.setState({ categoryName: res.data[0].name });
				setTimeout(() => {
					this.setState({ spinner: false });
				}, 500);
			})
			.catch((err) => console.log(err));
	}
	Click(name) {
		this.setState({ categoryName: name });
	}

	render() {
		const { allCategory, categoryName, spinner } = this.state;
		return (
			<>
				{spinner ? (
					<Spinner />
				) : (
					<>
						<Slider />
						<div className="container-flex mx-5 my-5">
							<div className="row">
								<div className="text-center m-2">
									<h1>Food Category Menu</h1>
								</div>
								{allCategory.map((category) => (
									<div
										id="category"
										onClick={this.Click.bind(this, category.name)}
										className="col"
									>
										{category.name}
									</div>
								))}
								<Dish categoryName={categoryName} />
							</div>
						</div>
					</>
				)}
			</>
		);
	}
}

export default Menu;
