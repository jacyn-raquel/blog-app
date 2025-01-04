import { Form, Button } from 'react-bootstrap';
import UserContext from '../UserContext';
import { useState, useEffect, useContext } from 'react';
import { Notyf } from 'notyf';
import {useNavigate} from 'react-router-dom';

export default function AddPost() {
    const { user } = useContext(UserContext);
    const notyf = new Notyf();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [isActive, setIsActive] = useState(false);

    const addPost = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/posts/`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                category,
                content,
                author: `${user.firstName} ${user.lastName}`
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setTitle('');
                    setCategory('');
                    setContent('');
                    notyf.success("Post added successfully.");

                    navigate('/posts');
                } else if (data.message === "Post already exists.") {
                    notyf.error("Post already exists.");
                } else {
                    notyf.error("Something went wrong. Contact IT support.");
                }
            })
            .catch(error => {
                console.error(error);
                notyf.error("An unexpected error occurred. Please try again later.");
            });
    };

    useEffect(() => {
        setIsActive(title.trim() !== '' && content.trim() !== '' && category.trim() !== '');
    }, [title, content, category]);

    return (
        <Form className="mt-3 p-5" onSubmit={addPost}>
            <h1 className="text-center">Create a Blog Post</h1>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control 
                    type="text"
                    value={category}
                    onChange={event => setCategory(event.target.value)} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={content}
                    onChange={event => setContent(event.target.value)} 
                />
            </Form.Group>
            {isActive ? (
                <Button variant="success" type="submit">Add Post</Button>
            ) : (
                <Button variant="danger" type="submit" disabled>Fill out the fields first</Button>
            )}
        </Form>
    );
}
