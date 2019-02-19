import React, { Component } from 'react';
import KeplerGl from 'kepler.gl';
import keplerGlReducer from 'kepler.gl/reducers';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import PropTypes from 'prop-types';
import withReducer from '../with-reducer';

// It is time to create and load kepler reducers
// Create custom reducer
const customKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    currentModal: null,
    activeSidePanel: null,
    readOnly: true,
    mapControls: {
      splitMap: { show: false },
      toggle3d: { show: false },
      mapLegend: { show: true },
    },
  },
  mapState: {
    zoom: 1,
    latitude: 0,
    longitude: 0,
  },
});

class Map extends Component {
  componentDidMount() {
    const { onLoad } = this.props;
    // Execute onLoad action
    onLoad();
  }

  render() {
    const {
      store,
      mapboxToken,
      onCountryClick,
    } = this.props;

    return (
      <AutoSizer>
        {({ height, width }) => (
          <KeplerGl
            id="map"
            mapboxApiAccessToken={mapboxToken}
            height={height}
            width={width}
            actions={{ onLayerClick: onCountryClick }}
            store={store}
          />
        )}
      </AutoSizer>
    );
  }
}

Map.propTypes = {
  store: PropTypes.shape({}).isRequired,
  mapboxToken: PropTypes.string.isRequired,
  onCountryClick: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default withReducer('keplerGl', customKeplerGlReducer)(Map);
