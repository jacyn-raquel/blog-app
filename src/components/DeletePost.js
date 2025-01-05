import {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Notyf} from 'notyf';

export default function DeletePost({post, fetchPosts}){
	const notyf = new Notyf();

	const {_id} = post;

	const deleteToggle = (event) => {

		event.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/posts/${_id}`,{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res=>res.json())
		.then(data => {
			console.log(data);

			if(data.message === "Post deleted successfully!"){
				fetchPosts();
				notyf.success('Post deleted successfully!');
			} else if (data.message === "Post already deleted or does not exist."){
				notyf.error('Post already deleted or does not exist.');
			} else {
				notyf.error('Something went wrong. Contact IT Admin.');
			}
		})
	}

	return(
		<>
            <Button variant="danger" size="sm" onClick={(event) => deleteToggle(event)}>Delete</Button>
        </>

		)
}