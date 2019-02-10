import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './App.css';
import { addDataToMap, onLayerClick } from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';
import PropTypes from 'prop-types';
import * as Actions from './actions';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Actions.loadData('/countries.json'));

    // this.props.match.params
    fetch('/countries.json')
      .then(res => res.json())
      .then(Processors.processKeplerglJSON)
      .then(data => dispatch(addDataToMap(data)))
      // eslint-disable-next-line
      .catch(console.error);
  }

  render() {
    const { onCountryClick } = this.props;

    // console.log("Current selected country is:", this.props.app.country);
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
  dispatch: PropTypes.func.isRequired,
  onCountryClick: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, mapDispathToProps)(App);
