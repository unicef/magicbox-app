import React, { Component, lazy, Suspense } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';
import { onLayerClick, updateVisData } from 'kepler.gl/actions';
import * as Actions from '../../actions';

// Load Map component dinamically -> code splitting
const LazyMap = lazy(() => import(/* webpackChunkName: "map" */ '../Map'));

// eslint-disable-next-line
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export class App extends Component {
  componentDidMount() {
    const {
      onLoadMap,
      history,
      match: { params: { dataset } },
    } = this.props;

    // Enable new data to be loaded when URL changes
    history.listen(loc => onLoadMap(dataset, loc.pathname, loc.search));
  }

  render() {
    const {
      onLoadMap,
      match: { params: { country, dataset } },
      location: { search },
      onCountryClick,
    } = this.props;

    // eslint-disable-next-line
    console.log('percentage:', this.props.app.ui.loading);

    // Country click should only be available when no country is selected
    const clickCallback = country ? onLayerClick : onCountryClick;

    return (
      <div className="App">
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Suspense fallback={<div>Loading...</div>}>
              <LazyMap
                store={store}
                mapboxToken={MAPBOX_TOKEN}
                onCountryClick={clickCallback}
                onLoad={() => onLoadMap(dataset, country ? `/c/${country}/` : '/', search)}
              />
            </Suspense>
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
  location: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => state;
const mapDispathToProps = dispatch => ({
  dispatch,
  onCountryClick: info => dispatch(Actions.onCountryClick(info)),
  onLoadMap: (dataset, path, search) => {
    // Load data from path to map
    dispatch(Actions.loadDataToMap(dataset, path));
    // Enable builder mode if needed
    // Once it is activated, it will not be deactivated
    const urlParams = new URLSearchParams(search);
    if (urlParams.has('builder')) {
      dispatch(updateVisData({}, { readOnly: false }, {}));
    }
  },
});

export default connect(mapStateToProps, mapDispathToProps)(App);
