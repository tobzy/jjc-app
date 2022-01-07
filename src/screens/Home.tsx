import React, {createElement, Fragment, useEffect, useRef} from 'react';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import { autocomplete } from '@algolia/autocomplete-js';
// import '@algolia/autocomplete-theme-classic';
import {MapService} from "../services/map-service";
import {AutoCompleteItem} from "../components/AutoCompleteItem";
import { useNavigate } from "react-router-dom";
import {render} from "react-dom";

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'jjc-app-recent-queries',
});

function Home() {
  const containerRef = useRef(null);
  let navigate = useNavigate();

  const navigateToSearch = (searchUrl:string) => {
    navigate(`/search?q=${searchUrl}`);
  }

  const displayAutcompleteItem = (item:any,components:any) => {
    return <AutoCompleteItem hit={item} components={components} navigateToSearch={navigateToSearch} />
  }
  useEffect(() => {

    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      placeholder: 'Search for places',
      renderer: { createElement, Fragment },
      openOnFocus: true,
      onSubmit(params) {
        console.log(params)
      },
      getSources({ query }) {
        return MapService.postAutocompleteQuery(query,displayAutcompleteItem);
      },
      plugins:[recentSearchesPlugin],
      navigator:{
        navigate({ itemUrl }) {
          navigate(`/search?q=${itemUrl}`);
        },
      },
      render({ children }:any, root) {
        render(children, root);
      },
    });

    return () => {
      search.destroy();
    };
  },[]);


  return (
    <div className="App">
      <div className='search-homepage'>
       <div className='search-container'>
         <div ref={containerRef} />
       </div>
      </div>
    </div>
  );
}


export {Home};
