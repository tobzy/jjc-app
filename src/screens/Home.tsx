import React from 'react';
import {Autocomplete} from "../components/AutoComplete";


function Home() {

  return (
    <div className="App">
      <div className='search-homepage'>
       <div className='search-container'>
         <Autocomplete/>
       </div>
      </div>
    </div>
  );
}


export {Home};
