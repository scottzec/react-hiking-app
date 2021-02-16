import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import UserList from './UserList.js';
import { NavLink, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import WeatherResponse from './WeatherResponse.js';
import Homepage from './components/Homepage.js';
import LoginPage from './components/LoginPage.js'
import UserResponse from './components/UserResponse.js'

// let BASE_URL = ''
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
//   BASE_URL = "http://127.0.0.1:5000";
// } else {
//   BASE_URL = "https://hiking-weather-api.herokuapp.com/";
//   console.log(BASE_URL)
// }

const BASE_URL = "http://127.0.0.1:5000"


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // ALSO FOR USER_ID?
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState(null);

  // Check if user is already logged in when app loads
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // Logs out user
  const handleLogout = () => {
    console.log("handleLogout triggered")
    console.log({user})
    console.log(Boolean(user));
    setUser(null); // Only works in short-term
    setUserID("");
    setUsername("");
    setPassword("");
    localStorage.clear();
    console.log({user});
    console.log(Boolean(user));
  };

  // // Asynch function to process login request
  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post(
      `${BASE_URL}/api/user`,
      user
    );
    console.log("Info on the user")
    console.log(user); // returns {"username": "four", "password": "four"}
    console.log(user.username); // returns "four"
    // set the state of the user
    setUser(response.data)
    setUserID(response.data.id)
    console.log('this is userID')
    console.log(userID)
    console.log(response.data.id)
    // store the user in localStorage
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response.data)
    console.log("printing local storage")
    console.log(JSON.parse(localStorage.getItem("user"))["id"])
  };
  // // Add tryCatch block to handle async function errors?


// CONNECTION TO WEATHER API. DO I NEED A CALLBACK? WHAT WOULD BE CLICKED?
// 1. pass down function all the way to entry
// 2. make button to be able to select them
// 3. pass data back 


// NAV STUFF
const NavigationNoUser = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/browse'>Browse Regions</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/login'>Login</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/create'>Create Account</NavLink></li>
    </ul>
  </nav>
);

const NavigationLoggedIn = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/browse'>Browse Regions</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/settings'>Settings</NavLink></li>
      <li><NavLink exact onClick={handleLogout} activeClassName="current" to='/logout'>Logout</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/browse' component={Browse}></Route>
    <Route exact path='/login' component={Login}></Route>
    {/* <Route exact path='/create' component={Create}></Route>
    <Route exact path='/settings' component={Settings}></Route> */}
    <Route exact path='/logout' component={Logout}></Route>
  </Switch>
);

const Home = () => (
  <div className='home'>
    <Homepage />
  </div>
);

const Browse = () => (
  <div className='browse'>
    <h1>Browse the Weather</h1>
    <UserResponse userID={userID} baseURL={BASE_URL} />
  </div>
);

const Login = () => (
  <div className='home'>
{/* Button to just log-in? */}
    {/* <LoginPage /> */}
  </div>
);

const Logout = () => (
  <div className='browse'>
    {/* Logged in as {user.username} */}
  </div>
);


  // return this if there is a user
  if (user) {
    return (
      <Router>
      <div className="App">
        <NavigationLoggedIn />
        <section>
          <h3>Logged in as {user.username}</h3>          
        </section>
        <Main />
          
      </div>
      </Router>
    );
  }

  // return if there's no user
  return (
    <Router>
    <div className="App">
      <NavigationNoUser />
      <Main />
        <section>
          {/* <h3>Logged out</h3> */}
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>  
            <input
              type="text"
              value={username}
              placeholder="enter username"
              onChange={({ target }) => setUsername(target.value)}
            />
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              value={password}
              placeholder="enter password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <p></p>
          <button type="submit">Login</button>
        </form>
      </section>
    </div>
    </Router>
  );
}

//CODE TO RETURN USER LIST
// const api_url = "http://127.0.0.1:5000/api/users"
  // // State hook to check for changes in data
  // const [userData, setUserData] = useState([]); 
  // // userData is data we retrieve via Flask (response.data)

  // // Effect hook to check for changes in data
  // useEffect(() => {
  //   axios.get(api_url)
  //   .then((response) => {
  //     const userList = response.data;
  //     setUserData(userList);
  //   })
  //   .catch((error) => {
  //     const message = `User list did not load. ${error.message}`
  //     console.log(message);
  //   })
  // }, []);

// User List
// <h4>Your Fellow Weather-Watching Hikers</h4>
//         <div>
//           {/* passing this data from flask into UserList component, userData passed as props "user" */}
//           <UserList users={userData}></UserList>
//         </div>

export default App;
