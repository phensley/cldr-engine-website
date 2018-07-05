import { Locale } from '@phensley/cldr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { localeFail, localeUpdate, Action } from '../actions';
import { framework } from '../locale';

const get = (locale: Locale) => framework.getAsync(locale);

export function* fetchLocale(action: Action<Locale>): IterableIterator<any> {
  const { payload } = action;
  console.log('here');
  try {
    const request = yield call(get, payload);
    yield put(localeUpdate(request));
  } catch (e) {
    yield call(console.warn, e);
    yield put(localeFail(payload));
  }
}

export function* localeSaga(): IterableIterator<any> {
  console.log('here');
  yield takeEvery('locale/change', fetchLocale);
}
