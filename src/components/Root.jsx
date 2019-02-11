import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from '../App';

// Root component
const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/c/:country/:dataset?" component={App} />
        <Route path="/:dataset" component={App} />
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default Root;
