import { ActionCreator, Action } from 'redux';
import { setUserInfoAction } from './types';
import moduleName from './constants';

export const SET_USER_INFO_TYPE = `${moduleName}/SET_USER_INFO`;
export const LOGOUT = `${moduleName}/LOGOUT`;

export const setUserInfo: ActionCreator<setUserInfoAction> = user => ({
  type: SET_USER_INFO_TYPE,
  payload: {
    user,
  },
});

export const logout: ActionCreator<Action> = () => ({
  type: LOGOUT,
});
