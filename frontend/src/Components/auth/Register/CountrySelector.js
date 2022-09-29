import classnames from 'classnames';
import React from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export class CountrySelector extends React.Component {
	constructor() {
		super();
		this.state = {
			countryName: '',
			options: [],
		};
	}
	componentDidMount() {
		this.setState({
			options: countryList().getData(),
		});
	}
	changeHandler = (value) => {
		this.props.CountrySelect(value.label);
		this.setState({ countryName: value });
	};
	render() {
		const { options, value } = this.state;
		return (
			<>
				<Select
					className={classnames('', {
						'is-invalid m-0': this.props.errors,
					})}
					placeholder="Country Name"
					options={options}
					value={value}
					onChange={this.changeHandler.bind(this)}
				/>
				{this.props.errors && (
					<div className="invalid-feedback mb-2">{this.props.errors}</div>
				)}
			</>
		);
	}
}

export default CountrySelector;
