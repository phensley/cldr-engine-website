import { combineReducers } from 'redux';
import { locale } from './locale';

export const reducer = combineReducers({
  locale
});

export type State = ReturnType<typeof reducer>
