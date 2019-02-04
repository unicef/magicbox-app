import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import keplerGlReducer from 'kepler.gl/reducers';
import {taskMiddleware} from 'react-palm/tasks';
import {handleActions} from 'redux-actions';

const customKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    currentModal: null,
    activeSidePanel: null,
  }
});

const reducers = combineReducers({
  keplerGl: customKeplerGlReducer,
  app: handleActions({}, {}),
});

const store = createStore(reducers, applyMiddleware(taskMiddleware));

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
