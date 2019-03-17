import { takeLatest, call, put } from 'redux-saga/effects';
import { describe } from 'riteway';
import {
  fetchForecasts,
  fetchForecastsSuccess,
  setError,
  clearError,
} from '../reducer';

import {
  fetchForecastsSaga,
  watchFetchForecasts,
  delay,
  getForecast
  } from '../saga';

describe('watchFetchForecasts()', async assert => {
  const iterator = watchFetchForecasts();
  assert({
    given: 'fetchForecasts action',
    should: 'handle fetch forecast completed request',
    actual: iterator.next().value,
    expected: takeLatest(fetchForecasts().type, fetchForecastsSaga),
  });
});

describe('fetchForecasts() Success', async assert => {
  const cityName = 'test';
  const zipCode = 62557;
  const iterator = fetchForecastsSaga(fetchForecasts({ cityName, zipCode }));
  const forecast = [];
  assert({
    given: 'next step',
    should: 'get forecast',
    actual: iterator.next().value,
    expected: call(getForecast, { cityName, zipCode }),
  });

  assert({
    given: 'next step',
    should: 'set forecast',
    actual: iterator.next({ forecast: forecast }).value,
    expected: put(fetchForecastsSuccess(forecast)),
  });
});

describe('fetchForecasts() Error', async assert => {
  const cityName = 'test';
  const zipCode = 62557;
  const iterator = fetchForecastsSaga(fetchForecasts({ cityName, zipCode }));

  assert({
    given: 'next step',
    should: 'fetch forecast',
    actual: iterator.next().value,
    expected: call(getForecast, { cityName, zipCode }),
  });

  {
    const error = new Error('test');
    assert({
      given: 'error step',
      should: 'set error message',
      actual: iterator.throw(error).value,
      expected: put(setError(error.message)),
    });
  }

  assert({
    given: 'next step',
    should: 'delay ',
    actual: iterator.next().value,
    expected: call(delay, 5000),
  });

  assert({
    given: 'next step',
    should: 'clear error',
    actual: iterator.next().value,
    expected: put(clearError()),
  });
});
