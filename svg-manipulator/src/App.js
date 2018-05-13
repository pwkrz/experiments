import React, { Component } from 'react';
import MapModule from './MapModule/MapModule';
import './App.css';

const Aux = (props) => props.children;

class App extends Component {
  
  render(){
      return (
        <Aux>
          <main>
            <MapModule />
          </main>
          {/* <div id="output" /> */}
        </Aux>
      )
  }
};

export default App;
