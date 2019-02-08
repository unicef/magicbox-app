import ActionTypes from '../constants/action-types';
import { createAction } from 'redux-actions';

export const onCountryClick = createAction(ActionTypes.COUNTRY_CLICK);

