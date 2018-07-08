import React from 'react';
import ItemCard from './../ItemCard/ItemCard';

function ItemList (props) {
  const cards = props.productData
                  .filter( product => props.categories[product.category] )
                  .map( product => (
                    <div key={product.name} className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4"><ItemCard product={product} /></div>
                  ));

  return (
    <div className="row px-3">
      {cards}
    </div>
  );
}

export default ItemList;