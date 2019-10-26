import { Action } from 'redux';

export interface UserState {
  info: object,
  isAuthenticated: boolean,
}

export interface setUserInfoAction extends Action {
  type: string,
  payload?: any,
}

export type UserActions = setUserInfoAction;
