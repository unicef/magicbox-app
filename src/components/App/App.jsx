import React, { Component, lazy, Suspense } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';
import { onLayerClick, updateVisData } from 'kepler.gl/actions';
import * as Actions from '../../actions';

// eslint-disable-next-line
const LazyMap = lazy(() => import(/* webpackChunkName: "map" */ '../Map'));

// eslint-disable-next-line
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export class App extends Component {
  componentDidMount() {
    const {
      dispatch,
      onLoadMap,
      history,
      location: { search },
      match: { params: { dataset } },
    } = this.props;

    history.listen(loc => onLoadMap(dataset, loc.pathname));

    // enable builder mode if needed
    const urlParams = new URLSearchParams(search);

    if (typeof urlParams.get('builder') !== 'undefined') {
      // eslint-disable-next-line
      console.log('builder mode');
      dispatch(updateVisData({}, { readOnly: false }, {}));
    }
  }

  render() {
    const {
      onLoadMap,
      match: { params: { country, dataset } },
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
                onLoad={() => onLoadMap(dataset, country ? `/c/${country}/` : '/')}
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
