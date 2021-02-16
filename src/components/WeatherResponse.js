import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import WeatherRegion from './WeatherRegion';
import ls from 'local-storage';


const WeatherResponse = (props) => { 
  const regionHolder = props.userRegion
  // console.log(regionHolder)

// Chris on how to avoid passing them down individually
// passes down the array as props and they could read it & use callback functions
// Provide a Context is a global variable. Child components can access and update
// instead of passing down thru multiple layers, you just have it jump.
  // URL/props.userRegion

    // SHOULD BE IN APP.JS, PASSED DOWN VIA PROPS FOR DEPLOYMENT
  const fullUrl = `${props.baseURL}/weather/${regionHolder}`
  console.log(fullUrl)
  const [region, setRegion] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect (() => {
    axios.get(fullUrl)
    .then((response) => {
      const regionWeather = response.data;
      setRegion(regionWeather);
      console.log(region)
    })
    .catch((error) => {
      setErrors(error.message);
      console.log(error.message);
    })
  }, []);

  // if we do have our region in the first statement, then render what's after the &&
  // if region exists, then we pass the region's info to the weatherRegion for rendering
  // React is stupid, it runs the whole page and in asynch, we have to check
  return (
    region && <WeatherRegion id={region.id} day={region.day} icon={region.icon} region={region.region} temp={region.temp} weather={region.weather} />
  )

  // return (
  //   <div className='weatherRegions'>
  //     {/* <p>{regionHolder}</p> */}
  //     <p>{region && region.region}</p>

  //     {/* // return (<li className="no_bullet" key={region.id}>{<WeatherRegion id={region.id} day={region.day} icon={region.icon} region={region.region} temp={region.temp} weather={region.weather} />}</li>); */}

  //       {() => {
  //         return (<li className="no_bullet" key={region.id}>{<WeatherRegion id={region.id} day={region.day} icon={region.icon} region={region.region} temp={region.temp} weather={region.weather} />}</li>);
  //         })
  //       }
  //     </ul>
  //   </div>
  // )
};

WeatherResponse.propTypes = {
  userRegion: PropTypes.string,
  baseURL: PropTypes.string
//  weatherCallback: PropTypes.func.isRequired
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