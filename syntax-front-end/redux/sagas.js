
import { all } from 'redux-saga/effects';

import { watchFetchForecasts } from '../src/features/fetchForecasts/saga';

export default function* rootSaga() {
  yield all([
    watchFetchForecasts(),
  ]);
};
