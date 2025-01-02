import {Form, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useNavigate, Navigate, Link} from 'react-router-dom';
import {Notyf} from 'notyf';

export default function Register(){

	const notyf = new Notyf();

	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	const registerUser = (event) => {
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/register`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data.message === "User Registered successfully!"){
				setFirstName('');
				setLastName('');
				setPassword('');
				setConfirmPassword('');

				notyf.success('User Registered successfully!')
				navigate('/login')
			} else if (data.message === 'Email input is invalid or password is below 8 characters!'){
				notyf.error("Email input is invalid or password is below 8 characters!");
			} else if (data.message === 'First and Last names should be given.'){
				notyf.error('First and Last names should be given.');
			} else if (data.message === "User already exists in our system."){
				notyf.error('User already exists in our system.');
			} else {
				notyf.error('Something went wrong! Contact your IT.');
			}
		})
	}

	useEffect(()=>{
		setIsActive(firstName !== '' && lastName !== '' && email !== '' && password !== '' && confirmPassword === password);
	},[firstName,lastName,email,password,confirmPassword])


	return (
		<Form className="p-5 mt-3 shadow rounded-3 col-6 mx-auto" onSubmit={event=>registerUser(event)}>
		  <h1 className="mb-4 text-center">Register</h1>
		  <Form.Group className="mb-3" controlId="firstName">
	        <Form.Label>First Name</Form.Label>
	        <Form.Control 
	        type="text"
	        value = {firstName}
	        onChange = {event => setFirstName(event.target.value)}
	        required />
	      </Form.Group>
	      <Form.Group className="mb-3" controlId="lastName">
	        <Form.Label>Last Name</Form.Label>
	        <Form.Control 
	        type="text"
	        value = {lastName}
	        onChange = {event => setLastName(event.target.value)}
	        required />
	      </Form.Group>
	      <Form.Group className="mb-3" controlId="email">
	        <Form.Label>Email address</Form.Label>
	        <Form.Control 
	        type="email" 
	      	value = {email}
	      	onChange = {event => setEmail(event.target.value)}
	        required />
	      </Form.Group>
	      <Form.Group className="mb-3" controlId="password">
	        <Form.Label>Password</Form.Label>
	        <Form.Control 
	        type="password"
	        value = {password}
	        onChange = {event => setPassword(event.target.value)}
	        placeholder="Enter password"
	        required />
	      </Form.Group>
	      <Form.Group className="mb-3" controlId="confirmPassword">
	        <Form.Label>Confirm Password</Form.Label>
	        <Form.Control 
	        type="password"
	        value = {confirmPassword}
	        onChange = {event => setConfirmPassword(event.target.value)}
	        placeholder="Enter password"
	        required />
	      </Form.Group>
	      {
	      	isActive ?
	      	<Button variant="primary" type="submit">Register</Button>
	      	:
	      	<Button variant="danger" disabled> Fill out ALL the fields first </Button>
	      }
	      <p>Already have an account? Login <a href="/login">here</a>.</p>
	    </Form>
		)
}