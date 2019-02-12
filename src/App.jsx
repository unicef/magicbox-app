import React, { Component } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';
import { onLayerClick, updateVisData } from 'kepler.gl/actions';
import { parse } from 'query-string';
import './App.css';
import * as Actions from './actions';
import Map from './components/Map';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {
  componentDidMount() {
    const {
      dispatch,
      onLoadMap,
      history,
      location: { search },
      match: { params: { country, dataset } },
    } = this.props;

    onLoadMap(dataset, country ? `/c/${country}/` : '/');
    history.listen(loc => onLoadMap(dataset, loc.pathname));

    // enable builder mode if needed
    const values = parse(search);

    if (typeof values.builder !== 'undefined') {
      // eslint-disable-next-line
      console.log('builder mode');
      dispatch(updateVisData({}, { readOnly: false }, {}));
    }
  }

  render() {
    const { onCountryClick, match: { params: { country } } } = this.props;
    // eslint-disable-next-line
    console.log('percentage:', this.props.app.ui.loading);

    // Country click should only be available when no country is selected
    const clickCallback = country ? onLayerClick : onCountryClick;

    return (
      <div className="App">
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Map
              store={store}
              mapboxToken={MAPBOX_TOKEN}
              onCountryClick={clickCallback}
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
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => state;
const mapDispathToProps = dispatch => ({
  dispatch,
  onCountryClick: info => dispatch(Actions.onCountryClick(info)),
  onLoadMap: (dataset, path) => dispatch(Actions.loadDataToMap(dataset, path)),
});

export default connect(mapStateToProps, mapDispathToProps)(App);
