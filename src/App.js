// Import User Context
import {UserProvider} from './UserContext';

// Import Components
import AppNavBar from './components/AppNavBar';

// Import Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Posts from './pages/Posts';
import PostView from './pages/PostView';
import Logout from './pages/Logout';
import AddPost from './pages/AddPost';
import Error from './pages/Error';

// Import Packages
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {useState, useEffect} from 'react';


function App() {

  const [user, setUser] = useState({
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    isAdmin: null
  })

  function unsetUser(){
    localStorage.clear();

    setUser({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      isAdmin: null
    })
  }

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.result?._id) {
          setUser({
            id: data.result._id,
            firstName: data.result.firstName,
            lastName: data.result.lastName,
            email: data.result.email,
            isAdmin: data.result.isAdmin,
          });
        } else {
          setUser({
            id: null,
            firstName: null,
            lastName: null,
            email: null,
            isAdmin: null,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  } else {
    setUser({
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      isAdmin: null,
    });
  }
}, []);



  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavBar/>
        <Container>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/posts" element={<Posts/>}/>
            <Route path="/posts/:postId" element={<PostView/>}/>
            <Route path="/posts/addPost" element={<AddPost/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<Error/>}/>
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
