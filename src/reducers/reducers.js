import ActionTypes from '../constants/action-types';

const DEFAULT_DATASET_NAME = 'shape.json';
const DEFAULT_PATH = '/';

export const INITIAL_APP_STATE = {
  ui: {
    sidePanelOpen: true,
    isLoading: false,
    loading: 1,
    error: null,
  },
  data: {
    country: null,
    path: DEFAULT_PATH,
    datasetName: DEFAULT_DATASET_NAME,
    dataset: null,
  },
};

// Update country name
export const countrySelectUpdater = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    country: action.payload.name,
    path: `/c/${action.payload.url}/`,
  },
});

// Update ui and data to new selected dataset/path
export const fetchDataUpdater = (state, action) => ({
  ...state,
  ui: {
    ...state.ui,
    isLoading: true,
    error: null,
    loading: 0,
  },
  data: {
    ...state.data,
    path: action.payload.path || DEFAULT_PATH,
    datasetName: action.payload.dataset || DEFAULT_DATASET_NAME,
    dataset: null,
  },
});

// Update ui loading status
export const fetchingDataUpdater = (state, action) => ({
  ...state,
  ui: {
    ...state.ui,
    isLoading: true,
    error: null,
    loading: action.payload,
  },
});

// Update dataset
export const fetchedDataUpdater = (state, action) => ({
  ...state,
  ui: {
    ...state.ui,
    isLoading: false,
    error: null,
    loading: 100,
  },
  data: {
    ...state.data,
    dataset: action.payload,
  },
});

// handle error
export const errorFetchingDataUpdater = (state, action) => ({
  ...state,
  ui: {
    ...state.ui,
    isLoading: false,
    loading: 0,
    error: action.payload,
  },
});

export const toggleSidePanelUpdater = state => ({
  ...state,
  ui: {
    ...state.ui,
    sidePanelOpen: !state.ui.sidePanelOpen,
  },
});

export default {
  [ActionTypes.COUNTRY_SELECT]: countrySelectUpdater,
  [ActionTypes.FETCH_DATA]: fetchDataUpdater,
  [ActionTypes.FETCHING_DATA]: fetchingDataUpdater,
  [ActionTypes.FETCHED_DATA]: fetchedDataUpdater,
  [ActionTypes.ERROR_FETCHING_DATA]: errorFetchingDataUpdater,
  [ActionTypes.TOGGLE_SIDE_PANEL]: toggleSidePanelUpdater,
};
