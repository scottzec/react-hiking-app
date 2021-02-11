import React from 'react';
import path from './path.jpg';


const Homepage = () => {

  console.log("Homepage is loading")
  return (
  <div>
    <header className="App-header">        
    <p>
      Weather App for your favorite Regions in Washington State
    </p>

        <img src={path} className="Hike-path" alt="hiking path cascades" />
    </header>
  </div>
  );

};

export default Homepage;