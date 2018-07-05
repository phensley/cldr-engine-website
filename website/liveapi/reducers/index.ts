import * as icepick from 'icepick';
import { combineReducers, Reducer } from 'redux';
import { locale, LocaleState } from './locale';

export interface State {
  locale: LocaleState;
}

export const reducer: Reducer<State> = combineReducers<State>({
  locale
});
