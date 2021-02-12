import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './WeatherRegion.css'

// This returns one entry in the weather forecast



const WeatherRegion = (props) => {
  return (
  <div className="region"> 
    <p className="region_name">{props.region}</p>
    <p className="region_day"> {props.day}</p>
    {/* <p> {props.icon}</p> */}
    <p> {props.weather} –– {props.temp} °F</p>
  </div>
  )
};

// for callback, need to have id come back up so we can pass it to flask (???? Maybe not)
// hold onto it (setState) then pass it
WeatherRegion.propTypes = {
  day: PropTypes.string,
  icon: PropTypes.string,
  region: PropTypes.string,
  temp: PropTypes.string,
  weather: PropTypes.string,
  id: PropTypes.string,
  // weatherCallback: PropTypes.func.isRequired
}


export default WeatherRegion;