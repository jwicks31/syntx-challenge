import { describe } from 'riteway';
import {
  reducer,
  fetchForecasts,
  fetchForecastsSuccess,
  clearForecasts,
  setError,
  clearError,
  getError,
  slice,
  getForecast
} from '../reducer';

const createState = ({
  isLoading = false,
  forecast = {
    forecast: [],
    city: undefined,
    state: undefined
  },
  error = {
      status: false,
      message: ''
    }} = {}) =>
  Object.freeze({
    isLoading,
    forecast,
    error
  });

describe('Forecasts reducer', async assert => {
  {
    assert({
      given: 'no arguments',
      should: 'return default state',
      actual: reducer(),
      expected: createState()
    });
  }
  {
    assert({
      given: 'an fetchForecasts action',
      should: 'set loading to true',
      actual: reducer(undefined, fetchForecasts()),
      expected: createState({ isLoading: true }),
    });
  }
  {
    const forecast = [{}, {}, {}];
    assert({
      given: 'a fetchForecastsSuccess action',
      should: 'set isLoading to false and set forecast',
      actual: reducer(createState({ isLoading: true }), fetchForecastsSuccess(forecast)),
      expected: createState({ forecast: forecast }),
    });
  }
  {
    const forecast = [{}, {}, {}];
    assert({
      given: 'a clearForecasts action',
      should: 'set the forecast to default state',
      actual: reducer(createState({ forecast }), clearForecasts()),
      expected: createState(),
    });
  }
  {
    const error = 'error';
    assert({
      given: 'setError action',
      should: 'set defaults and set error',
      actual: reducer(undefined, setError(error)),
      expected: createState({ error: { status: true, message: error }})
    });
  }
  {
    assert({
      given: 'clearError action',
      should: 'set defaults for error',
      actual: reducer(undefined, clearError()).error,
      expected: createState().error
    });
  }
  {
    const error = 'error';
    const initialState = { [ slice ]: reducer(undefined, setError(error)) };

    assert({
      given: 'getError selector',
      should: 'return error object from state',
      actual: getError(initialState),
      expected: { status: true, message: 'error' }
    });
  }

  {
    const forecast = [{}, {}, {}];
    const initialState = { [ slice ]: reducer(createState(), fetchForecastsSuccess(forecast)) };

    assert({
      given: 'getForecast selector',
      should: 'return forecast array from state',
      actual: getForecast(initialState),
      expected: forecast
    });
  }
});
