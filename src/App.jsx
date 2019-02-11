import React, { Component } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import './App.css';
import PropTypes from 'prop-types';
import * as Actions from './actions';
import Map from './components/Map';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {
  componentDidMount() {
    const { onLoadMap, history, match: { params: { country, dataset } } } = this.props;
    onLoadMap(dataset, country ? `/c/${country}/` : '/');
    history.listen(loc => onLoadMap(dataset, loc.pathname));
  }

  render() {
    const { onCountryClick } = this.props;
    // eslint-disable-next-line
    console.log('percentage:', this.props.app.ui.loading);

    return (
      <div className="App">
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Map
              store={store}
              mapboxToken={MAPBOX_TOKEN}
              onCountryClick={onCountryClick}
            />
          )}
        </ReactReduxContext.Consumer>
      </div>
    );
  }
}

App.propTypes = {
  onCountryClick: PropTypes.func.isRequired,
  onLoadMap: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => state;
const mapDispathToProps = dispatch => ({
  dispatch,
  onCountryClick: info => dispatch(Actions.onCountryClick(info)),
  onLoadMap: (dataset, path) => dispatch(Actions.loadDataToMap(dataset, path)),
});

export default connect(mapStateToProps, mapDispathToProps)(App);
