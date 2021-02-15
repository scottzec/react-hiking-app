import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import WeatherResponse from './WeatherResponse';
import ls from 'local-storage';

  // FILTER FOR REGIONS THAT HAVE THE USER_ID OF THE USERNAME
  // THEN PASS THEM THRU TO WEATHER RESPONSE, WHICH WILL GET THE WEATHER FOR THOSE REGIONS
const UserResponse = (props) => { 
  const fullUrl = `http://127.0.0.1:5000/api/regions/${props.userID}`; 
  //filter by user_id

  const [userRegions, setUserRegions] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect (() => {
    axios.get(fullUrl)
    .then((response) => {
      const userRegionsList = response.data;
      console.log(userRegionsList);
      setUserRegions(userRegionsList);
      console.log("User Regions");
      console.log(userRegionsList);
      console.log(userRegions); // userRegions = [ {}, {}]
    })
    .catch((error) => {
      setErrors(error.message);
      console.log(error.message);
    })
  }, []);

  return (
    <div className='weatherRegions'>
      <p>{props.userID}</p>
      <ul>
        {userRegions.map( (region) => {
        return (<li className="no_bullet" key={region.id}>{<WeatherResponse userRegion={region.region_name} />} </li>);
          })
        }
      </ul>
    </div>
  )
};

UserResponse.propTypes = {
  userID: PropTypes.number
//  weatherCallback: PropTypes.func.isRequired
}

export default UserResponse;