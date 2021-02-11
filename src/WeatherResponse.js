import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import WeatherRegion from './WeatherRegion';
import ls from 'local-storage';


const WeatherResponse = (props) => { 
  const fullUrl = 'http://127.0.0.1:5000/';

  const [regions, setRegions] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect (() => {
    axios.get(fullUrl)
    .then((response) => {
      const weatherList = response.data;
      console.log(weatherList);
      setRegions(weatherList);
    })
    .catch((error) => {
      setErrors(error.message);
      console.log(error.message);
    })
  }, []);

  return (
    <div className='weatherRegions'>
      <ul>
        {regions.map( (region) => {
          return (<li key={region.id}>{<WeatherRegion id={region.id} day={region.day} icon={region.icon} region={region.region} temp={region.temp} weather={region.weather} />}</li>);
          })
        }
      </ul>
    </div>
  )
};

WeatherResponse.propTypes = {
 weatherCallback: PropTypes.func.isRequired
}

export default WeatherResponse;


  // PAST: To return forecast details directly in WeatherResponse instead of passed as props:
  // const [ tahoma, mountainLoop] = regions

  // Ternary keeps page robust for missing data
  // const tahomaValues = tahoma ? Object.values(tahoma) : ["Loading"];
  // const mountainLoopValues = mountainLoop ? Object.values(mountainLoop) : ["Loading"];

  // Return:
  // <ul>
  //   {/* Tahoma: {tahomaValues}  */}
  //   <p></p>
  //   {/* Mountain Loop: {mountainLoopValues} */}
  // </ul>