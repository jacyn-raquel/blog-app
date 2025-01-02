import {Form, Button} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {useNavigate, Navigate, Link} from 'react-router-dom';
import UserContext from '../UserContext';
import {Notyf} from 'notyf';


export default function Login(){
	const notyf = new Notyf();
	const navigate = useNavigate();

	const {user, setUser} = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false);

	const loginUser = (event) => {
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email,
				password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.access){

				localStorage.setItem('token', data.access);

				retrieveUserDetails(data.access);
				setEmail('');
				setPassword('');

				notyf.success('User Successfully logged in!')
				navigate('/posts')
			} else if (data.message === 'No account found.'){
				notyf.error('No account found.');
			} else {
				notyf.error('Something went wrong! Contact IT Admin.');
			}
		})
	}

	const retrieveUserDetails = (token) => {
  fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const userDetails = {
          id: data.result._id,
          firstName: data.result.firstName,
          lastName: data.result.lastName,
          email: data.result.email,
          isAdmin: data.result.isAdmin,
        };
        setUser(userDetails);
        localStorage.setItem('user', JSON.stringify(userDetails));
      } else {
        setUser({
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          isAdmin: null,
        });
      }
    })
    .catch((err) => {
      console.error("Error fetching user details:", err);
    });
};


	useEffect(()=>{
		setIsActive(email !== '' && password !== '');
	},[email,password]);


	return (

		user.id !== null ?
		<Navigate to="/posts"/>
		:
		<Form className="p-5 mt-3 shadow rounded-3 col-6 mx-auto" onSubmit={event => loginUser(event)}>
		  <h1>Login</h1>
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
	      {
	      	isActive ?
	      	<Button variant="primary" type="submit">Login</Button>
	      	:
	      	<Button variant="danger" disabled> Fill out ALL the fields first </Button>
	      }
	      <p className="mt-3 text-center">No account yet? Register <a href='/register'>here</a>.</p>
	    </Form>

		)
}