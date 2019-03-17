import { combineReducers } from 'redux';

import { reducer as ForecastsReducer } from '../../src/features/fetchForecasts/reducer';

export default combineReducers({
  ForecastsReducer,
});
