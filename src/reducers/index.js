import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import keplerGlReducer from 'kepler.gl/reducers';
import appReducers, { INITIAL_APP_STATE } from './reducers';

// Customizing the default view of kepler
const customKeplerGlReducer = keplerGlReducer.initialState({
  uiState: {
    currentModal: null,
    activeSidePanel: null,
    readOnly: true,
    mapControls: {
      splitMap: { show: false },
      toggle3d: { show: false },
      mapLegend: { show: true },
    },
  },
  mapState: {
    zoom: 1,
    latitude: 0,
    longitude: 0,
  },
});

// Combine kepler reducers and app reducers
const reducers = combineReducers({
  keplerGl: customKeplerGlReducer,
  app: handleActions(appReducers, INITIAL_APP_STATE),
});

export default reducers;
