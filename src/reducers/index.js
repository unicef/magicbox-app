import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import keplerGlReducer from 'kepler.gl/reducers';

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
    zoom: 2,
    latitude: 0,
    longitude: 0,
  },
});

// Combine kepler reducers and app reducers
const reducers = combineReducers({
  keplerGl: customKeplerGlReducer,
  app: handleActions({}, {}),
});

export default reducers;
