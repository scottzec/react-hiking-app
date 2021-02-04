import logo from './logo.svg';
import path from './path.jpg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Weather App for your favorite Regions in Washington State
        </p>
        
        <img src={path} className="Hike-path" alt="hiking path cascades" />

        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
