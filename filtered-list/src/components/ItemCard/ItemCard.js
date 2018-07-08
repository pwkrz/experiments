import React from 'react';
import { getCategoryColor } from './../../helpers/helpers'
import './ItemCard.css';

function ItemCard (props) {
    const categoryColor = getCategoryColor(props.product.category);
    const defaultText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    
    return (
        <div className="card rounded-0">
            <img className="card-img-top bg-secondary rounded-0" src="http://via.placeholder.com/340x200" alt={props.product.name} />
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between card-title mb-4">
                    <span className="h5 mb-0">{props.product.name}</span>
                    <span className={'badge badge-pill text-white px-3 badge-' + categoryColor}>{props.product.category}</span>
                </div>
                <p className="card-text">{defaultText}</p>
                <span className={'chevron mr-2 text-' + categoryColor}>&gt;</span><a href="#" className="text-dark">More info</a>
            </div>
        </div>
    )
}
export default ItemCard;