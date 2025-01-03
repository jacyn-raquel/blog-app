import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';
import PostCard from './PostCard';

export default function UserView({ posts, fetchPosts }) {
    const { user } = useContext(UserContext);

    return (
        <>
            {posts.length > 0 ? (
                posts.map(post => (
                    <PostCard key={post._id} postProp={post} fetchPosts={fetchPosts} />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </>
    );
}
