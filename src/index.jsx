import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './components/Root';
import reducers from './reducers';

// Create browser history
const history = createBrowserHistory();

// Setting up middlewares
const middlewares = [thunk, routerMiddleware(history)];

// Creating the store
const store = createStore(reducers(history), applyMiddleware(...middlewares));

// Render the root component
ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
