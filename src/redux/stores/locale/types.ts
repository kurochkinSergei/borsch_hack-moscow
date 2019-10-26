import { Action } from 'redux';

export interface LocaleState {
  localeName: string,
  messages: {
    [key: string]: {
      [key: string]: string
    }
  },
  isLoading: boolean,
  error: object | null,
}

export interface getLocaleAction extends Action {
  type: string,
}

export interface getLocaleSuccessAction extends Action {
  type: string,
  payload: object,
}

export interface getLocaleErrorAction extends Action {
  type: string,
  error: Error,
}
