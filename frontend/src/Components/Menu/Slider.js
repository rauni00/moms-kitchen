import React from 'react';
import image1 from '../Image/image1.jpg';
import image2 from '../Image/image2.jpg';
import image3 from '../Image/image3.jpg';
import image4 from '../Image/image4.jpg';

export class Slider extends React.Component {
	render() {
		return (
			<div>
				<div
					id="carouselExampleIndicators"
					className="carousel slide"
					data-ride="carousel"
				>
					<ol className="carousel-indicators">
						<li
							data-target="#carouselExampleIndicators"
							data-slide-to="0"
							className="active"
						></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					</ol>
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img
								className="d-block  "
								style={{
									height: 400,

									maxWidth: '100%',
									maxHeight: '50%',
									minHeight: '50%',
									overflow: 'scroll',
									minWidth: '100%',
								}}
								src={image1}
								alt="First slide"
							/>
						</div>
						<div className="carousel-item">
							<img
								className="d-block "
								style={{
									height: 400,

									maxWidth: '100%',
									maxHeight: '50%',
									minHeight: '50%',
									overflow: 'scroll',
									minWidth: '100%',
								}}
								src={image2}
								alt="Second slide"
							/>
						</div>
						<div className="carousel-item">
							<img
								className="d-block "
								style={{
									height: 400,

									maxWidth: '100%',
									maxHeight: '50%',
									minHeight: '50%',
									overflow: 'scroll',
									minWidth: '100%',
								}}
								src={image4}
								alt="Second slide"
							/>
						</div>
						<div className="carousel-item">
							<img
								className="d-block "
								style={{
									height: 400,
									maxWidth: '100%',
									maxHeight: '50%',
									minHeight: '50%',
									overflow: 'scroll',
									minWidth: '100%',
								}}
								src={image3}
								alt="Third slide"
							/>
						</div>
					</div>
					<a
						className="carousel-control-prev"
						href="#carouselExampleIndicators"
						role="button"
						data-slide="prev"
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span className="sr-only">Previous</span>
					</a>
					<a
						className="carousel-control-next"
						href="#carouselExampleIndicators"
						role="button"
						data-slide="next"
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
			</div>
		);
	}
}

export default Slider;
