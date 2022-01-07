import React, {useEffect, useRef, useState} from 'react';
import ReactMapboxGl from "react-mapbox-gl";

const accessToken = 'pk.eyJ1IjoiampjLWRldiIsImEiOiJja3d1ZDQ5OTQxbTVrMm9ydHZ5OWExaW1qIn0.I6DlyCqTnk-Plz6r--IsyA'
function SearchMap() {

  const mapContainer = useRef(null)
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);


  const Map = ReactMapboxGl({
    accessToken
  });

  useEffect(() => {
    getLocation();
  },[]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setLocation);
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }
  const setLocation = (position:GeolocationPosition) =>{
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }
  return (
    <div className="App" id='map_Container'>
      <div ref={mapContainer} className="map-container" >
        <Map style="mapbox://styles/jjc-dev/ckx3mad6j2qg614mkgff8wi60" center={[lng, lat]}/>
      </div>
    </div>
  );
}


export {SearchMap};
