import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function PostView() {
  const notyf = new Notyf();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [datePostCreated, setDatePostCreated] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addComment = (event) => {
  event.preventDefault();

  fetch(`${process.env.REACT_APP_API_URL}/posts/addComment/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      comment: newComment,
      firstName: user.firstName,
      lastName: user.lastName
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === 'Comment added successfully!') {
        notyf.success('Comment added successfully!');
        setComments([...comments, { 
          comment: newComment, 
          firstName: user.firstName, 
          lastName: user.lastName,
          datePostCreated
        }]);
        setNewComment('');
        handleCloseModal();
      } else if (data.message === 'Comment already saved!') {
        notyf.error('Comment already saved!');
      } else {
        notyf.error('Comment cannot be added. Contact IT Admin.');
      }
    });
};


  useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setTitle(data.result.title || '');
      setCategory(data.result.category || '');
      setContent(data.result.content || '');
      setComments(data.result.comments || []); // Use empty array as fallback
      setDatePostCreated(data.result.datePostCreated || '');
    })
    .catch((error) => console.error('Error fetching post:', error));
}, [postId]);


  return (
    <Container>
      <Row>
        <Col className="col-10 offset-1 mt-5">
          <Card>
            <Card.Img variant="top" src="https://placehold.co/600x400" />
            <Card.Body>
              <Card.Title>Title: {title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Category: {category}</Card.Subtitle>
              <Card.Text>{content}</Card.Text>
              <hr />
              <Card.Title>Comments:</Card.Title>
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div className="border p-3 rounded-2 mt-2" key={index}>
                    <Card.Text> <strong>{comment.firstName} {comment.lastName}:</strong> {comment.comment}
                    <br/>
                    <strong>Date Created:</strong> {new Date(datePostCreated).toLocaleDateString()}
                    </Card.Text>
                  </div>
                ))
              ) : (
                <p>No comments.</p>
              )}

              {user.id !== null ? (
                <>
                  <Button variant="success my-3" onClick={handleShowModal}>
                    Add a Comment
                  </Button>
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <textarea
                        className="form-control"
                        placeholder="Write your comment here..."
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      ></textarea>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={addComment}>
                        Add Comment
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              ) : (
                <Button as={Link} variant="primary" to="/login">
                  Login to Add a Comment
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
