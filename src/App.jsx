import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './App.css';
import { onLayerClick } from 'kepler.gl/actions';
import PropTypes from 'prop-types';
import * as Actions from './actions';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {
  componentDidMount() {
    const { onLoadMap } = this.props;
    // eslint-disable-next-line
    const { country, dataset } = this.props.match.params;
    // eslint-disable-next-line
    onLoadMap(dataset, this.props.match.path);
  }

  render() {
    const { onCountryClick } = this.props;
    // eslint-disable-next-line
    console.log('percentage:', this.props.app.ui.loading);

    return (
      <div className="App">
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl
              id="map"
              mapboxApiAccessToken={MAPBOX_TOKEN}
              height={height}
              width={width}
              actions={{ onLayerClick: onCountryClick }}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

App.propTypes = {
  onCountryClick: PropTypes.func.isRequired,
  onLoadMap: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispathToProps = dispatch => ({
  dispatch,
  onCountryClick: (info) => {
    // A country click event only happens if the user has clicked in a country
    if (info) {
      dispatch(Actions.onCountryClick(info.object.properties));
    }

    // Dispatch usual action
    return onLayerClick(info);
  },
  onLoadMap: (dataset, path) => dispatch(Actions.loadDataToMap(dataset, path)),
});

export default connect(mapStateToProps, mapDispathToProps)(App);
