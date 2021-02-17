import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './WeatherRegion.css';
// import RegionEntry from './RegionEntry.js'

const RegionsAdd = (props) => { 
  const fullUrl = `${props.baseURL}/api/region`; 

  const [regionName, setRegionName] = useState([]);
  const [errors, setErrors] = useState(null);

  const userID=props.userID
  console.log(userID)

  const handleRegionSubmit = async e => {
    e.preventDefault();
    // const region = { regionName, userID };
    const region = {
      "region_name": regionName,
      "user_id": userID
    };
    console.log(region)
    // send the username and password to the server
    const response = await axios.post(
      `${props.baseURL}/api/region`,
      region
    );
    console.log("Info on the region")
    console.log(region); // returns {"username": "four", "password": "four"}
    // set the state of the user
    setRegionName(`${regionName} added`)
    // store the user in localStorage
    // localStorage.setItem('user', JSON.stringify(response.data))
  };


  return (
  <div className='weatherRegions'>
    <section>
        <table> 
        {/* style="width:100%" */}
          <thead>
            <th>Region</th>
            <th>Abbreviation</th>
          </thead>
          <tbody>
            <td>Tahoma</td>
            <td>tahoma</td>
          </tbody>
          <tbody>
            <td>Mountain Loop Highway</td>
            <td>mntnloop</td>
          </tbody>
          <tbody>
            <td>Koma Kulshan</td>
            <td>kulshan</td>
          </tbody>
          <tbody>
            <td>Big Quilcene River</td>
            <td>quilcene</td>
          </tbody>
          <tbody>
            <td>Skykomish</td>
            <td>skykomish</td>
          </tbody>
          <tbody>
            <td>Teanaway River Valley</td>
            <td>teanaway</td>
          </tbody>
          <tbody>
            <td>Stetattle Creek</td>
            <td>stetattle</td>
          </tbody>
        </table>
    </section>
    <p></p>
    <section>
      <form onSubmit={handleRegionSubmit}> 
        <label htmlFor="region_name">Region Abbreviation: </label>  
          <input
            type="text"
            value={regionName}
            placeholder="enter abbreviation"
            onChange={({ target }) => setRegionName(target.value)}
          />
        <p></p>
        <button type="submit">Add Each Region</button>
      </form>
    </section>
  </div>
  )
};



RegionsAdd.propTypes = {
  userID: PropTypes.number,
  baseURL: PropTypes.string
}

export default RegionsAdd;