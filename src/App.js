import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {
  render() {
    return (
      <div className="App">
        <KeplerGl
          id="map"
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispathToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispathToProps)(App);
