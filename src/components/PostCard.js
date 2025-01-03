import {Card, Button, CardGroup, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function PostCard({ postProp, fetchPosts }) {
    
    const { _id, title, category, content } = postProp;

    return (
    	<Row>
        <CardGroup >
            <Card className="col-6 mt-5 my-3 text-center">
            	<Card.Img variant="top" src="https://placehold.co/600x400" />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>Category:</Card.Subtitle>
                    <Card.Text>{category}</Card.Text>
                    <Card.Text className="text-success fw-bold">{content}</Card.Text>
                    <Link className="btn btn-primary" to={`/posts/${_id}`}>Details</Link>
                </Card.Body>
            </Card>
        </CardGroup>
        </Row>
    );
}
