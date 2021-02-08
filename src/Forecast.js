import React, { useState } from 'react';


// https://slacker.ro/2020/01/03/how-to-create-a-weather-app-with-react-openweathermap-api/

const Forecast = () => {

   function getForecast() {
    fetch("https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=san%20francisco%2Cus&lat=35&lon=139&cnt=10&units=metric%20or%20imperial", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "SIGN-UP-FOR-KEY",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });   }

   return (
    <div>
    <h2>Find 16 Day Weather</h2>
    <div>
        {JSON.stringify(responseObj)}
    </div>
    <button onClick={getForecast}>Get Forecast</button>
</div>
   )
}

export default Forecast;