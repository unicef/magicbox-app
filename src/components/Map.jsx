import React from 'react';
import KeplerGl from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import PropTypes from 'prop-types';

const Map = ({ store, mapboxToken, onCountryClick }) => (
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

Map.propTypes = {
  store: PropTypes.shape({}).isRequired,
  mapboxToken: PropTypes.string.isRequired,
  onCountryClick: PropTypes.func.isRequired,
};

export default Map;
