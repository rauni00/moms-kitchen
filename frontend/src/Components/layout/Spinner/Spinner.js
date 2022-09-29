import React from 'react';
import './Spinner.css';
import spinner from '../../Image/spinner.gif';

export class Spinner extends React.Component {
	render() {
		return (
			<div className="#">
				<img id="spin" className="img-fluid" src={spinner} alt="Loading" />
			</div>
		);
	}
}

export default Spinner;
