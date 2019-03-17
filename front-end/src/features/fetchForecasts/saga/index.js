import { call, takeLatest, put } from 'redux-saga/effects';
import {
  fetchForecasts,
  fetchForecastsSuccess,
  setError,
  clearError
} from '../reducer';

export const delay = (ms) => new Promise(res => setTimeout(res, ms));
export const getForecast = ({
    zipCode,
    cityName,
  } = {}) => new Promise((resolve, reject) => {
    if (zipCode) {
      fetch(`http://localhost:8080/api/weather?zipCode=${zipCode}`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'iloversuperdupersecrets'
          }
        })
        .then(async res => {
          const response = await res.json();
          if (response.forecast) resolve(response);
          else reject(response);
        })
        .catch(err => reject(err));
    } else {
        fetch(`http://localhost:8080/api/weather?city=${cityName}`, {
          method: 'GET',
          cors: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': 'iloversuperdupersecrets'
          }
        })
        .then(async res => {
          const response = await res.json();
          if (response.forecast) resolve(response);
          else reject(response);
        })
        .catch(err => reject(err));
    }
  });

export function* fetchForecastsSaga(action) {
  try {
    const { cityName, zipCode } = action.payload;
    const forecast = yield call(getForecast, { cityName, zipCode });
    yield put(fetchForecastsSuccess(forecast));
  } catch (e) {
    yield put(setError(e.message));
    yield call(delay, 5000);
    yield put(clearError());
  }
};

export function* watchFetchForecasts() {
  yield takeLatest(fetchForecasts().type, fetchForecastsSaga);
};
