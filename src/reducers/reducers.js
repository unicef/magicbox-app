import ActionTypes from '../constants/action-types';

export const INITIAL_APP_STATE = {
  ui: {
    loading: 1,
    error: null,
  },
  data: {
    path: '/',
    datasetName: 'countries.json',
    dataset: null,
  },
};

// Update country name
export const countryClickUpdater = (state, action) => ({
  ...state,
  data: {
    ...state.data,
    path: `/c/${action.payload.name}/`,
  },
});

// Update ui and data to new selected dataset/path
export const fetchDataUpdater = (state, action) => ({
  ...state,
  ui: {
    error: null,
    loading: 0,
  },
  data: {
    ...state.data,
    // get from pattern url in the payload
    path: action.payload,
  },
});

// Update ui loading status
export const fetchingDataUpdater = (state, action) => ({
  ...state,
  ui: {
    error: null,
    loading: action.payload,
  },
});

// Update dataset
export const fetchedDataUpdater = (state, action) => ({
  ...state,
  ui: {
    error: null,
    loading: 1,
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
    loading: 1,
    error: action.payload,
  },
});

export default {
  [ActionTypes.COUNTRY_CLICK]: countryClickUpdater,
  [ActionTypes.FETCH_DATA]: fetchDataUpdater,
  [ActionTypes.FETCHING_DATA]: fetchingDataUpdater,
  [ActionTypes.FETCHED_DATA]: fetchedDataUpdater,
  [ActionTypes.ERROR_FETCHING_DATA]: errorFetchingDataUpdater,
};
