import UserContext from '../UserContext';
import {useContext, useState, useEffect} from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import {Notyf} from 'notyf';
import {Navigate} from 'react-router-dom';

export default function Posts(){

	const notyf = new Notyf();

	const {user} = useContext(UserContext);

	const [posts, setPosts] = useState([]);

	const fetchData = () => {

    fetch(`${process.env.REACT_APP_API_URL}/posts/allPosts`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
            if (data.message === "All Posts retrieved." && data.result?.length > 0) {
                setPosts(data.result); // Ensure data is set for admin
                notyf.success('All Posts retrieved');
            } else if (data.result?.length === 0) {
                notyf.error('No posts exist.');
            } else {
                notyf.error('Something went wrong. Contact IT Admin.');
            }
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
        notyf.error('Failed to fetch posts. Please try again later.');
    });
};

	useEffect(() => {
		fetchData();
	}, [user]);

	return(
		user.id !== null ?
			user.isAdmin ?
				<AdminView posts={posts} fetchPosts={fetchData} />
				:
				<UserView posts={posts} fetchPosts={fetchData}/>
			:
			<Navigate to="/login"/>
		)
}