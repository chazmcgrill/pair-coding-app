import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './app/App';
import Grid from './app/pages/Grid';
import Landing from './app/pages/Landing';
import Curriculum from './app/pages/Curriculum';
import './index.sass';
import registerServiceWorker from './registerServiceWorker';
import reducers from './app/reducers';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Route path="/" exact component={Landing} />
				<Route path="/grid" exact component={Grid} />
				<Route path="/curriculum" exact component={Curriculum} />
			</App>
		</BrowserRouter>
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
