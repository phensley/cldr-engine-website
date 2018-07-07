import { CLDR, Locale } from '@phensley/cldr';
import { Action } from './types';

export interface LocaleChange extends Action<Locale> {
  type: 'locale/change';
  payload: Locale;
}

export interface LocaleFail extends Action<Locale> {
  type: 'locale/fail';
  payload: Locale;
}

export interface LocaleUpdate extends Action<CLDR> {
  type: 'locale/update';
  payload: CLDR;
}

export const localeChange = (payload: Locale) => ({ type: 'locale/change', payload });
export const localeFail = (payload: Locale) => ({ type: 'locale/fail', payload });
export const localeUpdate = (payload: CLDR) => ({ type: 'locale/update', payload });

export type LocaleAction = LocaleFail | LocaleChange | LocaleUpdate;
