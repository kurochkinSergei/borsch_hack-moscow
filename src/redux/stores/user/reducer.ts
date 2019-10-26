import { Reducer } from 'redux';
import { UserState, UserActions } from './types';
import { SET_USER_INFO_TYPE, LOGOUT } from './actions';

const initialState:UserState = {
  info: {},
  isAuthenticated: false,
};

const reducer:Reducer<UserState> = (state: UserState = initialState, action: UserActions) => {
  if (action.type === SET_USER_INFO_TYPE) {
    return {
      ...state,
      info: {
        ...action.payload.user,
      },
      isAuthenticated: true,
    };
  }
  if (action.type === LOGOUT) {
    return {
      ...state,
      info: {},
      isAuthenticated: false,
    };
  }
  return state;
};

export default reducer;
