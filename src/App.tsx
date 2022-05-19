import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import { useQueryClient } from 'react-query';
import { AppAuthenticated } from './AppAuthenticated';
import { AppUnauthenticated } from './AppUnauthenticated';
import { useAuth } from './context/auth-context';
import { Loading } from './components/Loading';

function App() {

  const mapContainer = useRef(null);
  const { appUser, userRole } = useAuth();
  const [userReady, setUserReady] = useState(false);
  const queryClient = useQueryClient();

  const map = useRef(null);
  const [lng, setLng] = useState(3.909892);
  const [lat, setLat] = useState(7.436598);

  useEffect(() => {
    // Check if user data has been loaded before rendering for smoother page load and for analytics initialization
    if (!!userRole && !!appUser?.user) {
      setUserReady(true);
    }
  }, [userRole, appUser]);

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
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  if (appUser) {
    return userReady && userRole ? (
      <AppAuthenticated />
    ) : (
      <Loading />
    );
  }

  return <AppUnauthenticated />;
}


export default App;
