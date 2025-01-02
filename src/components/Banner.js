import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Pen from '../assets/Pen.jpg';

export default function Banner({data}){
	const {title, subtitle, buttonDestinationOne, buttonDestinationTwo, buttonLabelOne, buttonLabelTwo} = data;

	return(
		<div id="hero-image"  className="img-fluid">
			<div id="hero-texts">
				<h1>{title}</h1>
				<p>{subtitle}</p>
				<div className="d-flex justify-content-center gap-3">
					<Button as={Link} variant="primary" to={buttonDestinationOne}>{buttonLabelOne}</Button>
					<Button as={Link} variant="outline-light" to={buttonDestinationTwo}>{buttonLabelTwo}</Button>
				</div>
			</div>
		</div>
	);
}
