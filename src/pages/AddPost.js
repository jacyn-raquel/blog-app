import {Form, Button} from 'react-bootstrap';
import UserContext from '../UserContext';
import {useState, useEffect, useContext} from 'react';
import {Notyf} from 'notyf';


export default function AddPost(){

	const {user} = useContext(UserContext);

	const notyf = new Notyf();

	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('');

	const addPost = (event) => {
		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/posts/`,{
			method: "POST",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				title,
				category,
				content
			})
		})
		.then(res=>res.json())
		.then(data => {
			console.log(data);
		})
	}


	return(
		<Form>
	      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
	        <Form.Label>Email address</Form.Label>
	        <Form.Control type="email" placeholder="name@example.com" />
	      </Form.Group>
	      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
	        <Form.Label>Example textarea</Form.Label>
	        <Form.Control as="textarea" rows={3} />
	      </Form.Group>
	    </Form>
		)
}