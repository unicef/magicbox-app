import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeplerGl from 'kepler.gl';
import { toggleModal } from 'kepler.gl/actions';
import { toggleSidePanel } from 'kepler.gl/actions';


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class App extends Component {

  componentDidMount() {
  // load data modal default to hidden
    this.props.dispatch(toggleModal(null))
  }

  render() {
return (
      <div className="App" placeholder="false">
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
