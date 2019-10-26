import moduleName from './constants';
import { State } from '../types';
import { LocaleState } from './types';

const getLocaleState = (state: State): LocaleState => state[moduleName];

export const getLocaleName = (state: State) => {
  const localeState = getLocaleState(state);
  return localeState.localeName;
};

export const getLocaleMessages = (state: State) => {
  const localeState = getLocaleState(state);
  return localeState.messages;
};
