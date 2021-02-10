import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import WeatherRegion from './WeatherRegion';

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
  }, [])

  // const options = videos.map( (video) => {
  //   return (<LibraryEntry id={video.id} name={video.name}/>);
  // })

  // videos.sort((a,b) => (a.title > b.title) ? 1 : -1)


//   <div className='weatherRegions'>
//   <ul>
//     {Object.entries(regions).map(([key, value]) => {
//       return (<li >{<WeatherRegion key={key} value={value}/>}</li>);
//       })};
//   </ul>
// </div>

  const { weather, temp } = regions

  return (
    <div className='weatherRegions'>
      <ul>
        Weather: {weather}
        <p></p>
        Temperature: {temp}
      </ul>
    </div>



  )


        {/* // REFERENCE WITH MAP */}
      {/* <ul>
        {regions.map( (region) => {
          return (<li key={region.id}>{<WeatherRegion id={region.id} icon={region.icon} temp={region.temp} weather={region.weather} weatherCallback={props.weatherCallback} />}</li>);
          })
        }
      </ul> */}


      // if ( ! videos) {
      //   return (errors)
      // } else {
      //   return (
      //   <ul>
      //     {videos.map( (video) => {
      //     return(<li> {video.name} </li>)
      //   })}
      //   </ul>)
      // }

      // return (
      //   <div className='videoLibrary'>
      //     {options ? options : errors }
      //   </div>
      // )
  

}

WeatherResponse.propTypes = {
 weatherCallback: PropTypes.func.isRequired
}

export default WeatherResponse;