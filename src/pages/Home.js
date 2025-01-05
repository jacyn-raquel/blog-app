import Banner from '../components/Banner';
import {useState, useEffect, useContext} from 'react';
import UserContext from '../UserContext';

export default function Home(){

	const {user} = useContext(UserContext);
	const [data, setData] = useState({});


	useEffect(() => {
		user.id !== null ?
			user.isAdmin ?
			setData({
				title: `Welcome to Blog-o-mania, Admin: ${user.firstName}! `,
				subtitle: "Manage, Inspire, and Empower with Your Vision.",
				buttonDestinationOne: "/posts",
				buttonDestinationTwo: "/logout",
				buttonLabelOne: "See all posted blogs",
				buttonLabelTwo: "Logout from my account"
			})
			:
			setData({
				title: `Welcome to Blog-o-mania, ${user.firstName}! `,
				subtitle: "Share Your Story, Shape the World",
				buttonDestinationOne: "/posts/allPosts",
				buttonDestinationTwo: "/posts",
				buttonLabelOne: "Add post",
				buttonLabelTwo: "See own posted blogs"
			})
		:
		
		setData({
			title: "Welcome to Blog-o-mania",
			subtitle: "Unleash Your Words, Inspire the World",
			buttonDestinationOne: "/login",
			buttonDestinationTwo: "/posts",
			buttonLabelOne: "Login first to start posting",
			buttonLabelTwo: "See posted blogs"
		})
	},[user])

	return(
		<Banner data={data} />
		)
}