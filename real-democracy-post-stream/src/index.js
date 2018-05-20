import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

console.log(process.env.RDPS_USER)

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
