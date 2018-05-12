import React, { Component } from 'react'
import TrailerPark from './Maps/tp'
import { getHypot, getDelta, getZoomPanParams, getPinchCenter, getZeroCoords, getDimensions } from './Helpers/helpers'
import "./PlanMapContainer.css"

export default class PlanMapContainer extends Component {
    mapBoxDimensions;
    mapDimensions;
    transformOrigin;
    leftLimit; topLimit; rightLimit; bottomLimit;
    zoom = 1;
    pinchZero = 0;
    pinchCenter = getZeroCoords();
    pos = getZeroCoords();
    newPos = getZeroCoords();
    eventStart = getZeroCoords();

    rectSelect = (e) => {
        e.currentTarget.classList.toggle("taken");

    }
    updateLimits = (ratio) => {
        this.leftLimit = this.mapBoxDimensions.inner.width - (this.mapDimensions.width * (ratio + 1/this.zoom) / 2);
        this.topLimit = this.mapBoxDimensions.inner.height - (this.mapDimensions.height * (ratio + 1/this.zoom) / 2);
        this.rightLimit = this.mapDimensions.width * (ratio - 1/this.zoom) / 2;
        this.bottomLimit = this.mapDimensions.height * (ratio - 1/this.zoom) / 2; 
    }
    getPos = ( ratio, newX = 0, newY = 0 ) => {

        this.updateLimits(ratio);
        
        let moveTo = {};

        if (ratio === 1 ) {
            moveTo.x = this.newPos.x + (newX - this.eventStart.x);
            moveTo.y = this.newPos.y + (newY - this.eventStart.y);
        } else {
            moveTo.x = (this.eventStart.x - (this.eventStart.x - this.mapDimensions.left) * ratio + this.mapDimensions.width/2 * ratio) - this.transformOrigin.x;
            moveTo.y = (this.eventStart.y - (this.eventStart.y - this.mapDimensions.top) * ratio + this.mapDimensions.height/2 * ratio) - this.transformOrigin.y;
        }

        moveTo.x = Math.min( Math.max(moveTo.x, this.leftLimit), this.rightLimit );

        moveTo.y = Math.min( Math.max(moveTo.y, this.topLimit), this.bottomLimit );

        return moveTo;
    }
    updateMapDims = () => { this.mapDimensions = this.refs.mapa.getBoundingClientRect(); }
    setNewTransform = (newPos, newZoom = this.zoom) => {

        this.refs.mapa.style.transform = `matrix(${newZoom},0,0,${newZoom},${newPos.x},${newPos.y})`;

        this.updateMapDims();
    }
    moveHandler = (e) => {
        e.preventDefault();

        let newX = e.clientX || e.touches[0].clientX,
            newY = e.clientY || e.touches[0].clientY;

        this.newPos = {x: this.pos.x, y: this.pos.y};

        this.newPos = this.getPos(1, newX, newY);

        this.setNewTransform(this.newPos);
    }
    wheelHandler = (e) => {

        e.preventDefault();

        let delta, newZoom;

        if (e.type === "touchmove" && e.touches[1]) {

            let { normalizedDelta, hyp } = getZoomPanParams(this.pinchZero, e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY);

            delta = normalizedDelta;

            this.pinchZero = hyp;
        
            // this.eventStart = { x: this.pinchCenter.x, y: this.pinchCenter.y };

        } else {
            delta = getDelta(e.deltaY);

            this.eventStart = { x: e.clientX, y: e.clientY };
        }
        
        newZoom = this.zoom.toFixed(2) - delta.toFixed(2) || this.zoom;

        if (newZoom < 1 || newZoom > 6) {
           return; 
        } else {        

            this.mapDimensions = getDimensions(this.refs.mapa);

            this.pos = this.getPos(newZoom/this.zoom);

            this.setNewTransform(this.pos, newZoom);

            this.zoom = newZoom; 
        }
    }
    mousedownHandler = (e) => {
        if ( e.touches && e.touches[1] ) {
            this.pinchZero = getHypot( e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY );

            this.eventStart = getPinchCenter(e.touches[0].clientX, e.touches[1].clientX, e.touches[0].clientY, e.touches[1].clientY);

            this.refs.mapBox.addEventListener("touchmove", this.wheelHandler, false);
            this.refs.mapBox.removeEventListener("touchmove", this.moveHandler, false);
        } else {
            this.eventStart.x = e.clientX || e.touches[0].clientX;
            this.eventStart.y = e.clientY || e.touches[0].clientY;

            this.refs.mapBox.addEventListener("mousemove", this.moveHandler, false);
            this.refs.mapBox.addEventListener("touchmove", this.moveHandler, false);
            this.refs.mapBox.removeEventListener("touchmove", this.wheelHandler, false);
        }        
    }
    mouseupHandler = (e) => {
        this.pos = this.newPos;
        this.eventStart = getZeroCoords();
        // this.newPos = getZeroCoords();

        this.refs.mapBox.removeEventListener("mousemove", this.moveHandler, false);
        this.refs.mapBox.removeEventListener("touchmove", this.moveHandler, true);
        this.refs.mapBox.removeEventListener("touchmove", this.wheelHandler, false);
    }
    componentDidMount(){
        this.refs.mapa = document.getElementById("mapSvg");

        this.mapBoxDimensions = getDimensions(this.refs.mapBox);
        this.mapDimensions = getDimensions(this.refs.mapa);
        this.transformOrigin = { x: this.mapDimensions.center.x, y: this.mapDimensions.center.y };

        document.addEventListener("mouseup", this.mouseupHandler, false);
        document.addEventListener("touchend", this.mouseupHandler, false);
        this.refs.mapBox.addEventListener("touchstart", this.mousedownHandler, false);
    }
    componentWillUnmount() {
        document.removeEventListener("mouseup", this.mouseupHandler, false);
        document.removeEventListener("touchend", this.mouseupHandler, false);
        this.refs.mapBox.removeEventListener("touchstart", this.mousedownHandler, false);
    }
    render(){
        return (
            <div ref="mapBox" className="svg-wrapper" onWheel={this.wheelHandler} onMouseDown={this.mousedownHandler}>

                <TrailerPark wheelHandler={this.wheelHandler}
                             mousedownHandler={this.mousedownHandler}
                             mouseupHandler={this.mouseupHandler}
                             rectSelect={this.rectSelect} />

            </div>
        )
    }
};