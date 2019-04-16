import { Reducer, AnyAction } from 'redux';
import * as icepick from 'icepick';
import { CLDR } from '@phensley/cldr';
import { LocaleAction } from '../actions';
import { English } from '../locale';

export interface LocaleState {
  cldr: CLDR;
}

const initialState = icepick.freeze({
  cldr: English
});

export const locale: Reducer<LocaleState> =
  (state: LocaleState = initialState, action: AnyAction): LocaleState => {
  switch (action.type) {
    case 'locale/update':
      return icepick.set(state, 'cldr', action.payload);
  }
  return state;
};
