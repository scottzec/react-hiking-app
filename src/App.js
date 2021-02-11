// import logo from './logo.svg';
import path from './path.jpg'
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList.js';
import { NavLink, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import WeatherResponse from './WeatherResponse.js';
import Home from './Home.js';


const api_url = "http://127.0.0.1:5000/api/users"


function App() {
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
const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/browse'>Browse Regions</NavLink></li>
      {/* <li><NavLink exact activeClassName="current" to='/login'>Login</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/create'>Create Account</NavLink></li> */}
    </ul>
  </nav>
);
        {/* MENU OPTIONS NOT LOGGED IN
        Login
        Create Account
        Browse Regions */}
        {/* MENU OPTIONS LOGGED IN
        Browse Regions
        Settings
        Logout */}

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/browse' component={Browse}></Route>
    {/* <Route exact path='/login' component={Login}></Route>
    <Route exact path='/create' component={Create}></Route> */}
  </Switch>
);

const Home = () => (
  <div className='home'>
    <h1>Welcome to Rainier Weather</h1> 
    <Home />
  </div>
);

const Browse = () => (
  <div className='browse'>
    <h1>Browse the Weather</h1>
    <WeatherResponse />
  </div>
);


{/* const Library = () => (
  <div className = 'library'>
    <h1>Peruse our video library</h1>
    <VideoLibrary libraryCallback={onClickLibraryCallback}/>
  </div>
);

const Customers = () => (
  <div className = 'customers'>
    <h1>List of customers</h1>
    <CustomerList listCallback={onClickCustomerListCallback}/>
  </div>
); */}







  // State hook to check for changes in data
  const [userData, setUserData] = useState([]); 
  // userData is data we retrieve via Flask (response.data)

  // Effect hook to check for changes in data
  useEffect(() => {
    axios.get(api_url)
    .then((response) => {
      const userList = response.data;
      setUserData(userList);
    })
    .catch((error) => {
      const message = `User list did not load. ${error.message}`
      console.log(message);
    })
  }, []);





  return (
    <Router>
    <div className="App">
      <Navigation />
      <Main />
      <header className="App-header">
        <p>
          Weather App for your favorite Regions in Washington State
        </p>

        <img src={path} className="Hike-path" alt="hiking path cascades" />

        <section>
        <h4>Your Fellow Weather-Watching Hikers</h4>
        <div>
          {/* passing this data from flask into UserList component, userData passed as props "user" */}
          <UserList users={userData}></UserList>
        </div>
      </section>

        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    



    </div>
    </Router>
  );
}

export default App;
