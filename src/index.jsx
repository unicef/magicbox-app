import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
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
/* thunk and taskMiddleware are somehow conflicting
 * for use cases where we need to concatenate a async
 * task after another async task. In this case, the
 * second async task is immediately dispatched.
 * To overcome this issue, thunk has to be applied
 * before taskMiddleware.
 * */
const middlewares = [thunk, taskMiddleware, routerMiddleware(history)];

// Creating the store
const store = createStore(reducers(history), applyMiddleware(...middlewares));

// Render the root component
ReactDOM.render(<Root store={store} history={history} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
