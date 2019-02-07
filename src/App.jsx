import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import './App.css';
import { addDataToMap } from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';
import PropTypes from 'prop-types';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

class App extends Component {
  componentDidMount() {
    fetch('/countries.json')
      .then(res => res.json())
      .then((t) => {
        const dataSets = {
          datasets: [
            {
              info: {
                id: 'global-admin-0',
                label: 'global-admin-0',
              },
              data: Processors.processGeojson(t),
            },
          ],
        };
        this.props.dispatch(addDataToMap(dataSets)); // eslint-disable-line
      })
      .catch(err => console.log(err)); // eslint-disable-line
  }

  render() {
    return (
      <div className="App">
        <AutoSizer>
          {({ height, width }) => (
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

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);
