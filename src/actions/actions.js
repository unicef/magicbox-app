import { createAction } from 'redux-actions';
import {
  addDataToMap,
  onLayerClick,
  updateVisData,
  layerConfigChange,
} from 'kepler.gl/actions';
import Processors from 'kepler.gl/processors';
import { push } from 'connected-react-router';
import ActionTypes from '../constants/action-types';

const [
  noop,
  onCountrySelect,
  fetchData,
  fetchingData,
  fetchedData,
  errorFetchingData,
  toggleSidePanel,
  toggleDataInfo,
] = [
  ActionTypes.NOOP,
  ActionTypes.COUNTRY_SELECT,
  ActionTypes.FETCH_DATA,
  ActionTypes.FETCHING_DATA,
  ActionTypes.FETCHED_DATA,
  ActionTypes.ERROR_FETCHING_DATA,
  ActionTypes.TOGGLE_SIDE_PANEL,
  ActionTypes.TOGGLE_DATA_INFO,
].map(action => createAction(action));

// On country click action
const onCountryClick = info => (dispatch, getState) => {
  console.log('clicked a country');
  // dispatch usual kepler.gl action
  dispatch(onLayerClick(info));
  // if the user clicked in a object with properties
  if (info && info.object && info.object.properties && info.object.properties.path) {
    // dispatch country select action
    dispatch(onCountrySelect(info.object.properties));
    // get current state
    const { app: { data } } = getState();
    // dispatch push to change the url
    dispatch(push(`${data.datasetName}${data.path}`));
  }

  // return noop because kepler is expecting a action
  return noop();
};

// Load data action
const loadData = (dataset = null, path = null) => ((dispatch, getState) => {
  // Initialize fetching state
  dispatch(fetchData({ dataset, path }));

  // fetch dataset from url
  const { app: { data } } = getState();

  const url = `${process.env.SERVER_URL}/api/files${data.datasetName}${data.path}`;
  console.log(url);
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => dispatch(fetchedData(responseJson)))
    // set error
    .catch(err => dispatch(errorFetchingData(err)));
});

// Load data to map
const loadDataToMap = (dataset = null, path = null) => ((dispatch, getState) => (
  dispatch(loadData(dataset, path))
    .then(() => getState().app.data.dataset)
    .then(Processors.processKeplerglJSON)
    .then(data => dispatch(addDataToMap(data)))
));

// On Zoom level change
const onZoomLevelChange = () => (dispatch, getState) => {
  // Minimum zoom level allowed before triggering request for
  // global explorer dataset
  const MIN_ZOOM_LEVEL = 1.5;
  const {
    keplerGl: {
      map: {
        mapState: {
          zoom,
        },
      },
    },
    app: {
      data: {
        country,
      },
    },
  } = getState();

  // check if it is necessary to trigger the load event
  if (zoom && country && zoom <= MIN_ZOOM_LEVEL) {
    // Remove selected country
    dispatch(onCountrySelect(null));
    // Go to the main screen
    dispatch(push('/'));
  }
};

// Set visible layers by id
const setVisibleLayers = visibleLayersIds => (dispatch, getState) => {
  const state = getState();

  // Check if map is already defined
  if (!(state.keplerGl
      && state.keplerGl.map
      && state.keplerGl.map.visState
      && state.keplerGl.map.visState.layers)) {
    return dispatch(noop());
  }

  const {
    keplerGl: {
      map: {
        visState: {
          layers,
        },
      },
    },
  } = state;

  const allUniqueVisibleLayers = new Set(visibleLayersIds);

  layers.forEach((layer) => {
    const isVisible = allUniqueVisibleLayers.has(layer.id);
    dispatch(layerConfigChange(layer, { isVisible }));
  });

  return dispatch(noop());
};

// Enable builder mode
const enableBuilderMode = () => dispatch => dispatch(updateVisData({}, { readOnly: false }, {}));

export {
  onCountrySelect,
  onCountryClick,
  fetchData,
  fetchingData,
  fetchedData,
  errorFetchingData,
  toggleSidePanel,
  toggleDataInfo,
  loadData,
  loadDataToMap,
  enableBuilderMode,
  onZoomLevelChange,
  setVisibleLayers,
};
