import React, { Component } from 'react';
import './App.css';

import AppHeader from './containers/AppHeader/AppHeader';
import AppMain from './containers/AppMain/AppMain';

class App extends Component {

  productData = [
    {name: 'Apple', category: 'Fruit'},
    {name: 'Aubergine', category: 'Vegetable'},
    {name: 'Banana', category: 'Fruit'},
    {name: 'Broccoli', category: 'Vegetable'},
    {name: 'Chicken', category: 'Meat'},
    {name: 'Orange', category: 'Fruit'},
    {name: 'Beef', category: 'Meat'},
    {name: 'Zucchini', category: 'Vegetable'}
  ]

  render() {
    
    return (
      <div className="container-fluid mt-4">
        <AppHeader />
        <AppMain productData={this.productData} />
      </div>
    );
  }
}

export default App;
