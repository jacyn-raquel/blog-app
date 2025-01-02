import UserContext from '../UserContext';
import {useContext, useState, useEffect} from 'react';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';
import {Notyf} from 'notyf';
import {Navigate} from 'react-router-dom';

export default function Posts(){

	const notyf = new Notyf();

	const {user} = useContext(UserContext);

	const [data, setData] = useState([]);

	const fetchData = () => {
		const fetchURL = user.isAdmin ? "posts/allPosts" : "posts/allPostsByUser";

		fetch(`${process.env.REACT_APP_API_URL}/${fetchURL}`,{
			headers:{
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(!user.isAdmin){
				if(data.message === 'All posts by this user are retrieved successfully!'){

					setData(data);

					notyf.success('All posts by this user are retrieved successfully!');
				} else if(data.message === "No posts made by this user."){
					notyf.error('No posts made by this user.');
				} else {
					notyf.error('Something went wrong! Contact IT Admin.')
				}
			} else {
				if(data.message === "All Posts retrieved"){
					notyf.success('All Posts retrieved');
				} else {
					notyf.error('No posts exists.');
				}
			}
			
		})
	}
	return(
		user.id !== null ?
			user.isAdmin ?
				<AdminView posts={data} />
				:
				<UserView posts={data}/>
			:
			<Navigate to="/login"/>
		)
}