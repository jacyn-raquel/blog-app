import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import PostCard from './PostCard';
import AddPost from '../pages/AddPost';
import {Button, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function UserView({ posts, fetchPosts }) {
    const { user } = useContext(UserContext);

    return (
        <>
          <Container>
            <Row>
                <Col className="mt-3 p-5 d-flex flex-column justify-content-center">
                    <Button className="py-3" as={Link} variant="success" to="/posts/AddPost"> Add New Post </Button>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <PostCard key={post._id} postProp={post} fetchPosts={fetchPosts} />
                        ))
                    )
                    : (
                        <>
                          <Container>
                            <Row>
                              <Col className="mt-4 p-5 text-center">
                                    <p>No posts available</p>
                                    <Button variant="success" as={Link} to="/posts/addPost"> Add Post </Button>
                              </Col>
                            </Row>
                          </Container>
                        </>
                     )}
                </Col>
            </Row>
          </Container>
        </>
    );
}
