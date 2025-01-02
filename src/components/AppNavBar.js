import {Container, Nav, Navbar} from 'react-bootstrap';
import UserContext from '../UserContext';
import {useContext} from 'react';

export default function AppNavBar(){

	const {user} = useContext(UserContext);

	return(
		<Navbar expand="lg" className="bg-body-tertiary">
		      <Container>
		        <Navbar.Brand href="/">Blog APP</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		         	 <Nav.Link href="/" exact="true">Home</Nav.Link>
		          {
		          	user.id ?
		          		<>
		          			<Nav.Link href="/posts" exact="true">Posts</Nav.Link>
		          			<Nav.Link href="/logout" exact="true">Logout</Nav.Link>
		          		</>
		          	:
		          		
		          		<>
		          			<Nav.Link href="/register" exact="true">Register</Nav.Link>
		          			<Nav.Link href="/login" exact="true">Login</Nav.Link>
		          		</>
		          }

		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>

		)
}