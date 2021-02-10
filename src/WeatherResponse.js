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



  // SPREAD OPERATOR...HASH OK? const { region1, region2, ...others } = regions

  console.log(regions)

  const [ tahoma, mountainLoop ] = regions

  console.log(tahoma)


  // keeps page robust for missing data
  const tahomaValues = tahoma ? Object.values(tahoma) : ["Loading"];

  console.log(tahomaValues)

  const mountainLoopValues = mountainLoop ? Object.values(mountainLoop) : ["Loading"];
  console.log(mountainLoopValues)


  return (
    <div className='weatherRegions'>
      <ul>
        Tahoma: {tahomaValues} 
        <p></p>
        Mountain Loop: {mountainLoopValues}
      </ul>
    </div>
  )

}

WeatherResponse.propTypes = {
 weatherCallback: PropTypes.func.isRequired
}

export default WeatherResponse;

//   <div className='weatherRegions'>
//   <ul>
//     {Object.entries(regions).map(([key, value]) => {
//       return (<li >{<WeatherRegion key={key} value={value}/>}</li>);
//       })};
//   </ul>
// </div>