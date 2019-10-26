import { Action, ActionCreator } from 'redux';
import { getLocaleAction, getLocaleErrorAction, getLocaleSuccessAction } from './types';
import moduleName from './constants';

export const GET_LOCALE = `${moduleName}/GET_LOCALE`;
export const GET_LOCALE_SUCCESS = `${moduleName}/GET_LOCALE_SUCCESS`;
export const GET_LOCALE_ERROR = `${moduleName}/GET_LOCALE_ERROR`;
export const SET_LOCALE_NAME = `${moduleName}/SET_LOCALE_NAME`;

export const getLocale: ActionCreator<getLocaleAction> = () => ({
  type: GET_LOCALE,
});

export const getLocaleSuccess: ActionCreator<getLocaleSuccessAction> = payload => ({
  type: GET_LOCALE_SUCCESS,
  payload,
});

export const getLocaleError: ActionCreator<getLocaleErrorAction> = (error: Error) => ({
  type: GET_LOCALE_ERROR,
  error,
});

export const setLocaleName: ActionCreator<Action> = (localeName: string) => ({
  type: SET_LOCALE_NAME,
  payload: {
    localeName,
  },
});
