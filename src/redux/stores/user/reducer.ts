import { Reducer } from 'redux';
import { UserState, UserActions } from './types';
import { SET_USER_INFO_TYPE } from './actions';

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
  return state;
};

export default reducer;
