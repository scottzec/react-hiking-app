import React from 'react';
import path from './path.jpg';


const Home = () => {
<header className="App-header">
        <p>Home Component SHOWS</p>
        <p>
          Weather App for your favorite Regions in Washington State
        </p>

        <img src={path} className="Hike-path" alt="hiking path cascades" />
</header>
}

export default Home;