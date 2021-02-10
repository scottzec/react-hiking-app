import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// This returns one entry in the weather forecast



const WeatherRegion = (props) => {
  return (
  <div> 
    
    <p>
    <button 
      onClick={() => {props.weatherCallback(
        {id: props.id, 
        icon: props.icon,
        temp: props.temp,
        weather: props.weather
      }
        )
      }
    }
    > 
      <img src={props.image_url} alt={props.title}/>
      <p>Select {props.title}</p>
    </button>
    <p> </p>
    </p>
    </div>
  )
}

// for callback, need to have id come back up so we can pass it to flask
// hold onto it (setState) then pass it
WeatherRegion.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  temp: PropTypes.string,
  weather: PropTypes.string,
  weatherCallback: PropTypes.func.isRequired
}


export default WeatherRegion;