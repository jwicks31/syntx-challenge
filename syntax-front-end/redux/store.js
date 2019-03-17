// LINK: https://github.com/redux-saga/redux-saga/

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import mySaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export default initialState => {
  // mount initial state and saga middleware on the Store
  const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

  // then run the saga
  sagaMiddleware.run(mySaga);
  return store;
};
