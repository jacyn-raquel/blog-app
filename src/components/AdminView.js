import { useState, useEffect } from "react";
import { Table, Row, Button, Modal } from "react-bootstrap";
import DeletePost from "./DeletePost";
import {Notyf} from 'notyf';

export default function AdminView({ posts, fetchPosts }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [postIdToDeleteFrom, setPostIdToDeleteFrom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const notyf = new Notyf();

  const handleRemoveComment = (postId, commentId) => {
    setCommentToDelete(commentId);
    setPostIdToDeleteFrom(postId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    // if (commentToDelete !== null && postIdToDeleteFrom) {
      fetch(`${process.env.REACT_APP_API_URL}/posts/${postIdToDeleteFrom}/deleteComment/${commentToDelete}`, {
        method: "DELETE",
        headers: {
        	"Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "Comment has been successfully deleted!"){
          	fetchPosts();
          	setShowConfirmModal(false);

          	notyf.success("Comment has been successfully deleted!");
          } else if (result.message === "Comment already deleted!"){
          	notyf.error('Comment already deleted!');
          } else {
          	notyf.error('Something went wrong. Contact IT Admin.');
          }
          
        })
        .catch((error) => {
          console.error("Error removing comment:", error);
          setShowConfirmModal(false);
        });
    // }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [posts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title || "No Title"}</td>
                  <td>{post.category || "Uncategorized"}</td>
                  <td>{post.content || "No Content"}</td>
                  <td>
                    {post.datePostCreated
                      ? new Date(post.datePostCreated).toLocaleDateString()
                      : "Unknown Date"}
                  </td>
                  <td>
                    {post.comments && post.comments.length > 0 ? (
                      <ul>
                        {post.comments.map((comment, index) => (
                          <li key={index}>
                            {/* Ensure you are accessing the correct property for the comment */}
                            {comment.comment || "No Comment Text"}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleRemoveComment(post._id, comment._id)}
                              className="mx-2"
                            >
                              Remove
                            </Button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No Comments"
                    )}
                  </td>
                  <td>
                    <DeletePost post={post} fetchPosts={fetchPosts} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No posts exist.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>

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
