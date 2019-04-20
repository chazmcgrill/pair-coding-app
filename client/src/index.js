import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import Guide from './routes/Guide';
import Languages from './routes/Languages';
import Main from './routes/Main';
import Curriculum from './routes/Curriculum';
import Inbox from './routes/Inbox';
import Messages from './routes/Messages';

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
                <Route path="/guide" exact component={Guide} />
                <Route path="/languages" exact component={Languages} />
                <Route path="/curriculum" exact component={Curriculum} />
                <Route path="/inbox" exact component={Inbox} />
                <Route path="/inbox/messages/:roomId" component={Messages} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);

registerServiceWorker();
