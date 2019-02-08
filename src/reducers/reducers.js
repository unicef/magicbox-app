import ActionTypes from '../constants/action-types';

export const INITIAL_APP_STATE = {
  country: null,
};

export const countryClickUpdater = (state, action) => ({
  country: action.payload.name,
});

export default {
  [ActionTypes.COUNTRY_CLICK]: countryClickUpdater,
};
