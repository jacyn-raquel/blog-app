import UserContext from '../UserContext';
import { useContext, useEffect, useState } from 'react';
import { Table, Row, Button, Modal } from 'react-bootstrap';
import DeletePost from './DeletePost';

export default function AdminView({ posts, fetchPosts }) {
  const { user } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [postIdToDeleteFrom, setPostIdToDeleteFrom] = useState(null);


  console.log(posts);
  
  const handleRemoveComment = (postId, commentIndex) => {
    // Remove the comment from the post
    const updatedPosts = posts.map(post => {
      if (post._id === postId) {
        const updatedComments = post.comments.filter((_, index) => index !== commentIndex);
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    // Update the state with the new post data
    setTableData(updatedPosts);

    // Call the API to delete the comment (this assumes you have an API for this)
    fetch(`/api/posts/${postId}/comments/${commentIndex}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Comment removed:', data);
        fetchPosts();  // Reload posts data after comment removal
      })
      .catch(error => {
        console.error('Error removing comment:', error);
      });
  };

  const handleConfirmDelete = () => {
    // Call the deletion function with the stored postId and commentIndex
    if (commentToDelete !== null && postIdToDeleteFrom) {
      fetch(`/api/posts/${postIdToDeleteFrom}/comments/${commentToDelete}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          console.log('Comment removed:', data);
          fetchPosts();  // Reload posts data after comment removal
          setShowConfirmModal(false);
        })
        .catch(error => {
          console.error('Error removing comment:', error);
          setShowConfirmModal(false);
        });
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  // Map the posts and generate table rows
  function mapPost() {
    if (!posts || posts.length === 0) {
      // Handle case where there are no posts
      setTableData([<tr key="no-posts"><td colSpan="6" className="text-center">No posts exist</td></tr>]);
      return;
    }

    const rows = posts.map(post => (
      <tr key={post.result._id}>
        <td>{post.result.title}</td>
        <td>{post.result.category}</td>
        <td>{post.result.content}</td>
        <td>{post.result.datePostCreated}</td>
        <td>
          {/* List the comments */}
          <ul>
            {post.comments && post.comments.map((comment, index) => (
              <li key={index}>
                {comment}
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => handleRemoveComment(post._id, index)}
                  className="mx-2"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </td>
        <td>
          <DeletePost post={post} fetchPosts={fetchPosts} />
        </td>
      </tr>
    ));

    setTableData(rows);
  }

  useEffect(() => {
    mapPost();
  }, [user, posts]);  // Ensure this effect runs when posts data changes

  return (
    <>
      <div className="text-center p-3">
        <h2>Admin Dashboard</h2>
      </div>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Content</th>
              <th>Post Created</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </Table>
      </Row>

      {/* Confirm deletion modal */}
      <Modal show={showConfirmModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this comment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
