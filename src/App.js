// import logo from './logo.svg';
import path from './path.jpg'
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList.js';

const api_url = "http://127.0.0.1:5000/api/users"

function App() {
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
    <div className="App">
      <header className="App-header">
        <p>
          Weather App for your favorite Regions in Washington State
        </p>
        {/* MENU OPTIONS NOT LOGGED IN
        Login
        Create Account
        Browse Regions */}
        {/* MENU OPTIONS LOGGED IN
        Browse Regions
        Settings
        Logout */}

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
  );
}

export default App;
