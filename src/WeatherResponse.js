import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import WeatherRegion from './WeatherRegion';
import ls from 'local-storage';

//   // FILTER FOR REGIONS THAT HAVE THE USER_ID OF THE USERNAME
//   // THEN DISPLAY THEM
// const WeatherResponse = (props) => { 
//   const fullUrl = `http://127.0.0.1:5000/api/regions/${props.userID}`; 
//   //filter by user_id

//   const [userRegions, setUserRegions] = useState([]);
//   const [errors, setErrors] = useState(null);

//   useEffect (() => {
//     axios.get(fullUrl)
//     .then((response) => {
//       const regionsList = response.data;
//       console.log(regionsList);
//       setUserRegions(regionsList);
//     })
//     .catch((error) => {
//       setErrors(error.message);
//       console.log(error.message);
//     })
//   }, []);

//   return (
//     <div className='weatherRegions'>
//       <p>{props.userID}</p>
//       {/* <p>{regions}</p> */}
//       <ul>
//         {userRegions.map( (region) => {
//         // return (<li className="no_bullet" key={region.id}>{region.region_name}</li>);
//         return (<li className="no_bullet" key={region.id}>{<WeatherRegion id={region.id} day={region.day} icon={region.icon} region={region.region} temp={region.temp} weather={region.weather} />}</li>);
//           })
//         }
//       </ul>
//     </div>
//   )
// };


const WeatherResponse = (props) => { 
  const regionHolder = props.userRegion
  // console.log(regionHolder)

// Chris on how to avoid passing them down individually
// passes down the array as props and they could read it & use callback functions
// Provide a Context is a global variable. Child components can access and update
// instead of passing down thru multiple layers, you just have it jump.
  // URL/props.userRegion


  const fullUrl = `http://127.0.0.1:5000/weather/${regionHolder}`
  const [regions, setRegions] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect (() => {
    axios.get(fullUrl)
    .then((response) => {
      const weatherList = response.data;
      setRegions(weatherList);
      console.log(regions)
    })
    .catch((error) => {
      setErrors(error.message);
      console.log(error.message);
    })
  }, []);

  return (
    <div className='weatherRegions'>
      {/* <p>{regionHolder}</p> */}
      <p>{regions}</p>
      {/* <ul>
        {regions.map( (region) => {
          return (<li className="no_bullet" key={region.id}>{<WeatherRegion id={region.id} day={region.day} icon={region.icon} region={region.region} temp={region.temp} weather={region.weather} />}</li>);
          })
        }
      </ul> */}
    </div>
  )
};

WeatherResponse.propTypes = {
  userRegion: PropTypes.string
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