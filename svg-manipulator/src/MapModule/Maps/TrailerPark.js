import React from 'react';
import {mapPath, lots} from "./MapSVG/path-strings"
import "./TrailerPark.css";

function TrailerPark (props) {
        let pathsArray = lots.paths.map( (coords, i) => (<path className="lot" key={`lot-path-${i}`} d={coords} onClick={props.rectSelect} />)),
            rectsArray = lots.rects.map( (coords, i) => (
              <rect className="lot" key={`lot-rect-${i}`} x={coords.x} y={coords.y} width={coords.width} height={coords.height} onClick={props.rectSelect} />)
            );

        return (
          <svg id="mapSvg" version="1.1" viewBox="0 0 1082.3 741.55" xmlns="http://www.w3.org/2000/svg">
            <path className="plan" d={mapPath} strokeWidth="100" />
            <g>
              {pathsArray}
              {rectsArray}
            </g>
          </svg>
    )
};

export default TrailerPark;