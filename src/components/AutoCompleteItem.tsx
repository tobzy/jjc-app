import React  from 'react';

export function AutoCompleteItem({ hit, components,navigateToSearch,setQuery }:any) {
  return (
    <div onClick={(e) => {
      setQuery(hit.queryPlusText);
      navigateToSearch(hit.queryPlusText);
    }} className="aa-ItemLink" style={{zIndex:1000}}>
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="queryPlusText" />
        </div>
      </div>
    </div>
  );
}
