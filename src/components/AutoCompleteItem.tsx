import React  from 'react';

export function AutoCompleteItem({ hit, components,navigateToSearch }:any) {
  return (
    <div onClick={(e) => {
      navigateToSearch(hit.queryPlusText)
    }} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="queryPlusText" />
        </div>
      </div>
    </div>
  );
}
