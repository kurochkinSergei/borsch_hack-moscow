import { ActionCreator } from 'redux';
import { setUserInfoAction } from './types';
import moduleName from './constants';

export const SET_USER_INFO_TYPE = `${moduleName}/SET_USER_INFO`;

export const setUserInfo: ActionCreator<setUserInfoAction> = user => ({
  type: SET_USER_INFO_TYPE,
  payload: {
    user,
  },
});
