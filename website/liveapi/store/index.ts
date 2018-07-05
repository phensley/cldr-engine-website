import { applyMiddleware, compose, createStore, Store as ReduxStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { reducer, State } from '../reducers';

const REDUX_EXT = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

interface SagaStore<T> extends ReduxStore<T> {
  runSaga: any;
  endSaga: any;
}

const composeEnhancers = typeof window === 'object' &&
  window[REDUX_EXT] ? window[REDUX_EXT]({}) : compose;

export const setupStore = (state: State): SagaStore<State> => {
  console.log('setup');
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore<State>(reducer, state, enhancer) as SagaStore<State>;
  const { hot } = module as any;
  if (hot) {
    hot.accept('../reducers', () => {
      const next = require('../reducers');
      store.replaceReducer(next);
    });
  }
  store.runSaga = sagaMiddleware.run;
  store.endSaga = () => store.dispatch(END);
  return store;
};
