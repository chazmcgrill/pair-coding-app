import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './app/App';
import Grid from './app/pages/Grid';
import Landing from './app/pages/Landing';
import Curriculum from './app/pages/Curriculum';
import './index.sass';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
    	<App>
			<Route path="/" exact component={Landing} />
			<Route path="/grid" exact component={Grid} />
			<Route path="/curriculum" exact component={Curriculum} />
		</App>
	</BrowserRouter>
, document.getElementById('root'));

registerServiceWorker();
