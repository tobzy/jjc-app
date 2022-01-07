import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {Home} from "./screens/Home";
import {SearchMap} from "./screens/Map";

function App() {

  const mapContainer = useRef(null)
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);

  useEffect(() => {
    getLocation();
  },[]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }
  const showPosition = (position:GeolocationPosition) =>{
    console.log([position.coords.latitude, position.coords.longitude])
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }
  return (
    <div className="App"><Router>
      <Routes>
        <Route path="/search"   element={ <SearchMap/>}/>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>

    </div>
  );
}


export default App;
