import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './App.css';
import { addDataToMap, onLayerClick } from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {

  componentDidMount() {
    fetch('/countries.json')
    .then(res => res.json())
    .then(Processors.processKeplerglJSON)
    .then(data => {
      this.props.dispatch(addDataToMap(data));
    })
    .catch(err => console.log(err))
  }

  render() {
    let { onCountryClick } = this.props;

    return (
      <div className="App">
        <AutoSizer>
          {({height, width}) => (
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
const mapStateToProps = state => state;
const mapDispathToProps = dispatch => ({
  dispatch,
  onCountryClick: (info) => {
    // A country click event only happens if the user has clicked in a country
    if (info) {
      console.log('will dispatch country click for:', info.object.properties);
    }

    // Dispatch usual action
    return onLayerClick(info);
  },
});

export default connect(mapStateToProps, mapDispathToProps)(App);
