import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './App.css';
import { addDataToMap } from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {

  componentDidMount() {
    fetch('/countries.json')
    .then(res => res.json())
    .then(t => {
      let dataSets = {
        datasets: [
          {
            info: {
              id: 'global-admin-0',
              label: 'global-admin-0'
            },
            data: Processors.processGeojson(t)
          }
        ]
      };
      this.props.dispatch(addDataToMap(dataSets));
  })
  .catch(err => console.log(err))
}

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
              onMapClick={this.onClick}
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
