import { createAction } from 'redux-actions';
import ActionTypes from '../constants/action-types';

export const onCountryClick = createAction(ActionTypes.COUNTRY_CLICK);

export default onCountryClick;
