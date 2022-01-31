import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import {MapService} from "../services/map-service";
import {AutoCompleteItem} from "./AutoCompleteItem";
import {useNavigate} from "react-router-dom";
import {createLocalStorageRecentSearchesPlugin} from "@algolia/autocomplete-plugin-recent-searches";
import {debouncePromise} from "../lib/utils";

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'jjc-app-recent-queries',
});
const debounced = debouncePromise((items:any) => Promise.resolve(items), 300);

export function Autocomplete({fetchFeatures, ...props}:any) {
  const containerRef = useRef(null);
  let navigate = useNavigate();



  const navigateToSearch = (searchUrl:string) => {
    if(fetchFeatures){
      fetchFeatures(searchUrl)
    }
    navigate(`/search?q=${searchUrl}`);
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
      render({ children }:any, root) {
        render(children, root);
      },
      getSources:({ query, setQuery }) => {
        const displayAutcompleteItem = (item:any,components:any) => {
          return <AutoCompleteItem hit={item} components={components} navigateToSearch={navigateToSearch} setQuery={setQuery} />
        }
        return debounced(MapService.postAutocompleteQuery(query,displayAutcompleteItem));
      },
      // plugins:[recentSearchesPlugin],
      navigator:{
        navigate({ itemUrl }) {
          if(fetchFeatures){
            fetchFeatures(itemUrl)
          }
          navigate(`/search?q=${itemUrl}`);
        },
      },
      onStateChange({ state }) {
        // console.log(state);
      },
      ...props,
    })


    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef}/>;
}
