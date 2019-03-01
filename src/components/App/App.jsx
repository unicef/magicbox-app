import React, { Component, lazy, Suspense } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import PropTypes from 'prop-types';
import { onLayerClick } from 'kepler.gl/actions';
import * as Actions from '../../actions';
import LoadingIndicator from '../LoadingIndicator';
import SidePanel from '../SidePanel';
import DataInfo from '../DataInfo';

// Load Map component dinamically -> code splitting
const LazyMap = lazy(() => import(/* webpackChunkName: "map" */ '../Map'));

// eslint-disable-next-line
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

export class App extends Component {
  componentDidMount() {
    const {
      onLoadMap,
      history,
      match: { params: { dataset } },
    } = this.props;

    // Enable new data to be loaded when URL changes
    history.listen(loc => onLoadMap(dataset, loc.pathname));
  }

  setupMapAfterLoad = () => {
    const {
      onLoadMap,
      enableBuilderMode,
      match: { params: { country, dataset } },
      location: { search },
    } = this.props;
    // Load data to map
    onLoadMap(dataset, country ? `/c/${country}/` : '/');

    // Enable builder mode if needed
    // Once it is activated, it will not be deactivated
    const urlParams = new URLSearchParams(search);
    if (urlParams.has('builder')) {
      enableBuilderMode();
    }
  };

  render() {
    const {
      match: { params: { country } },
      onCountryClick,
      app: {
        ui: {
          loading,
          isLoading,
          sidePanelOpen,
          dataInfoOpen,
        },
      },
      toggleSidePanel,
      toggleDataInfo,
    } = this.props;

    // Country click should only be available when no country is selected
    const clickCallback = country ? onLayerClick : onCountryClick;

    return (
      <div className="App">
        <SidePanel
          open={sidePanelOpen}
          toggleAction={toggleSidePanel}
          title="Poverty Mapping"
        />
        <DataInfo
          open={dataInfoOpen}
          toggleAction={toggleDataInfo}
          content={[{ title: 'About', content: 'Lorem ipsulum dolor with format...', order: 1 }, { title: 'HDI & Poverty', content: 'Welcome to UNICEF\'s data visualization tool for Human Development Index (HDI).', order: 2 }]}
        />
        {isLoading && <LoadingIndicator value={loading} />}
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Suspense fallback={<LoadingIndicator />}>
              <LazyMap
                store={store}
                mapboxToken={MAPBOX_TOKEN}
                onCountryClick={clickCallback}
                onLoad={this.setupMapAfterLoad}
              />
            </Suspense>
          )}
        </ReactReduxContext.Consumer>
      </div>
    );
  }
}

App.propTypes = {
  onCountryClick: PropTypes.func.isRequired,
  onLoadMap: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  app: PropTypes.shape({}).isRequired,
  toggleSidePanel: PropTypes.func.isRequired,
  toggleDataInfo: PropTypes.func.isRequired,
  enableBuilderMode: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  dispatch,
  onCountryClick: info => dispatch(Actions.onCountryClick(info)),
  onLoadMap: (dataset, path) => dispatch(Actions.loadDataToMap(dataset, path)),
  enableBuilderMode: () => dispatch(Actions.enableBuilderMode()),
  toggleSidePanel: () => dispatch(Actions.toggleSidePanel()),
  toggleDataInfo: () => dispatch(Actions.toggleDataInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
