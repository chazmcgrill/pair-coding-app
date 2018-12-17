import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './app/App';
import Grid from './app/pages/Grid';
import Main from './app/pages/Main';
import Curriculum from './app/pages/Curriculum';
import Messages from './app/pages/Messages';

import './index.sass';
import registerServiceWorker from './registerServiceWorker';
import reducers from './app/reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	{},
	composeEnhancer(applyMiddleware(reduxThunk)),
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Route path="/" exact component={Main} />
				<Route path="/grid" exact component={Grid} />
				<Route path="/curriculum" exact component={Curriculum} />
				<Route path="/messages" component={Messages} />
			</App>
		</BrowserRouter>
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
