import { all, fork, AllEffect } from 'redux-saga/effects';
import { localeSaga } from './locale';

export function* rootSaga(): IterableIterator<AllEffect<any>> {
  yield all([
    fork(localeSaga),
  ]);
}
