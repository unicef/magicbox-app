import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';

// Temporary component
const NotImplemented = () => (<h1>Sorry, we do not have this feature yet :(</h1>);

// Root component
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/c/:country/:dataset?" component={NotImplemented} />
        <Route path="/c/:country?" component={NotImplemented} />
        <Route path="/:dataset" component={NotImplemented} />
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
