import { combineReducers, createStore, applyMiddleware } from 'redux';
import { handleActions } from 'redux-actions';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import appReducers, { INITIAL_APP_STATE } from './reducers/reducers';

// Combine all reducers to pass to the store
const createReducer = (history, asyncReducers) => combineReducers({
  app: handleActions(appReducers, INITIAL_APP_STATE),
  router: connectRouter(history),
  ...asyncReducers,
});

// Creating the store
const initializeStore = (history) => {
  // Setting up middlewares
  const middlewares = [thunk, routerMiddleware(history)];

  const store = createStore(createReducer(history), applyMiddleware(...middlewares));

  store.asyncReducers = {};
  store.injectReducer = (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(history, store.asyncReducers));
    return store;
  };

  return store;
};

export default initializeStore;
