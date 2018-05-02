import React, { Component } from 'react';
import PlanMapContainer from './PlanMapContainer/PlanMapContainer';
import './App.css';

const Aux = (props) => props.children;

class App extends Component {
  
  render(){
      return (
        <Aux>
          <main>
            <PlanMapContainer />
          </main>
          {/* <div id="output" /> */}
        </Aux>
      )
  }
};

export default App;
