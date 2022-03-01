import React from 'react';
import {Autocomplete} from "../components/AutoComplete";
import logo from '../assets/images/icon.png'
import styled from 'styled-components'
import {Footer} from "../components/Footer";


function Home() {

  return (
    <div className="App">
      <LogoImage src={logo}/>
      <div className='search-homepage'>
       <div className='search-container'>
         <Autocomplete/>
       </div>
        <Footer/>
      </div>
    </div>
  );
}

const LogoImage = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 64px;
  background-color: white;
  border-radius: 50px;
  z-index: 10;
`

export {Home};
