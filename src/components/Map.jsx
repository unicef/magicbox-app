import React, { Component } from 'react';
import KeplerGl from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import PropTypes from 'prop-types';

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

export default Map;
