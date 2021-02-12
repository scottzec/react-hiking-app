// import logo from './logo.svg';
import path from './path.jpg'
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList.js';
import { NavLink, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WeatherResponse from './WeatherResponse.js';
import Homepage from './Homepage.js';
import Login from './Login.js'


function App() {
  // https://gist.github.com/onedebos/bbf7cd4634bce53103c1cfefa6164637#file-app-js-L62
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    setUsername("");
    setPassword("");
    localStorage.clear();
    console.log({user});
    console.log(Boolean(user));
    // MAYBE SET A DIFFERENT STATE TO LOGGED OUT?
    // Somehow user still exists.
  };

  // Asynch function to process login request
  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    const response = await axios.post(
      "http://127.0.0.1:5000/api/user",
      user
    );
    console.log("Info on the user")
    console.log(user); // returns {"username": "four", "password": "four"}
    console.log(user.username); // returns "four"
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', JSON.stringify(response.data))
    console.log(response.data)
  };
  // Add tryCatch block to handle async function errors?


// CONNECTION TO WEATHER API. DO I NEED A CALLBACK? WHAT WOULD BE CLICKED?
// 1. pass down function all the way to entry
// 2. make button to be able to select them
// 3. pass data back 
// const onClickLibraryCallback = (video) => {
//   setSelectedVideoID(video.id);
//   setSelectedVideoTitle(video.title);
//   console.log('onClickLibraryCallback was called')
// }




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
      <li><NavLink exact activeClassName="current" to='/logout'>Logout</NavLink></li>
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
    {/* <h1>Welcome to Rainier Weather</h1>  */}
    <Homepage />
  </div>
);

const Browse = () => (
  <div className='browse'>
    <h1>Browse the Weather</h1>
    <WeatherResponse />
  </div>
);

const Login = () => (
  <div className='home'>
{/* Button to just log-in? */}
    {/* <Login /> */}
  </div>
);

const Logout = () => (
  <div className='browse'>
    {/* Button to log out? Or does it go below? */}
    {/* <Potential Logout Component /> */}
    {/* {user.name} is loggged in
    <button onClick={handleLogout}>logout</button> */}
  </div>
);


  // return this if there is a user
  if (user) {
    return (
      <Router>
      <div className="App">
        <NavigationLoggedIn />
        <Main />
          <section>
          <h3>Logged in as {user.username}</h3>
          <button onClick={handleLogout}>Logout</button>
        </section>
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
          <h3>Logged out</h3>
      </section>

      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
            <input
              type="text"
              value={username}
              placeholder="enter a username"
              onChange={({ target }) => setUsername(target.value)}
            />
          <div>
            <label htmlFor="password">password: </label>
            <input
              type="password"
              value={password}
              placeholder="enter a password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
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
