import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './App.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {

  render() {
    return (
      <div className="App">
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              id="map"
              mapboxApiAccessToken={MAPBOX_TOKEN}
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispathToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispathToProps)(App);
