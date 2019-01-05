import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import Grid from './pages/Grid';
import Main from './pages/Main';
import Curriculum from './pages/Curriculum';
import Inbox from './pages/Inbox';
import Messages from './pages/Messages';

import './index.sass';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

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
                <Route path="/inbox" exact component={Inbox} />
                <Route path="/inbox/messages/:roomId" component={Messages} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
