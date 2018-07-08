import React from 'react';
import { getCategoryColor } from './../../helpers/helpers'
import './FilterSelector.css';

function FilterSelector (props) {
  const checkBoxes = Object.keys(props.categories).map( cat => (
    <div key={cat+'-filter'} className={'badge badge-pill mr-2 mb-2 mb-sm-0 d-block d-sm-inline-block text-white badge-' + getCategoryColor(cat)}>
      <input name={cat} type="checkbox" id={cat + 'Checkbox'} className="mr-1" checked={props.categories[cat]}
              onChange={props.categorySelector} />
      <label htmlFor={cat + 'Checkbox'} className="filter-label mb-0 offset-bottom-sm">{cat}</label>
    </div>
  ))

  return (
    <div className="col-12 mb-3 px-5">
      <label className="mr-2">Filter:</label>
      <div className="d-block d-sm-inline-block">{checkBoxes}</div> 
    </div>
  );
}

export default FilterSelector;