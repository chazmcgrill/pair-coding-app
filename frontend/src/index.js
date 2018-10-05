import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './routes'; // where we are going to specify our routes
import registerServiceWorker from './registerServiceWorker';

import './assets/css/main.css';


ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
