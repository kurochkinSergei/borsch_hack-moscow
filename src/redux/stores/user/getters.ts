import { UserState } from './types';
import moduleName from './constants';
import { State } from '../types';

const getUserState = (state: State): UserState => state[moduleName];

export const getAuthenticatedStatus = (state: State) => {
  const userState = getUserState(state);
  return userState.isAuthenticated;
};

export const getUserInfo = (state: State) => {
  const userState = getUserState(state);
  return userState.info;
};
