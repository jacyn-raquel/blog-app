import UserContext from '../UserContext';
import {useContext, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
export default function Logout(){
	const {setUser, unsetUser} = useContext(UserContext);

	useEffect(()=>{
		unsetUser();

		setUser({
			id: null,
			firstName: null,
			lastName: null,
			email: null,
			isAdmin: null
		})
	},[])

	return(
		<Navigate to="/login"/>
		)
}