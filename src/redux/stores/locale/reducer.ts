import { Reducer } from 'redux';
import { LocaleState } from './types';
import {
  GET_LOCALE, GET_LOCALE_ERROR, GET_LOCALE_SUCCESS, SET_LOCALE_NAME,
} from './actions';

const initialState:LocaleState = {
  localeName: 'en',
  messages: {},
  isLoading: false,
  error: null,
};

const reducer:Reducer<LocaleState> = (state: LocaleState = initialState, action) => {
  switch (action.type) {
    case GET_LOCALE:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LOCALE_SUCCESS:
      return {
        ...state,
        messages: {
          ...action.payload,
        },
        isLoading: false,
      };
    case GET_LOCALE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SET_LOCALE_NAME:
      return {
        ...state,
        localeName: action.payload.localeName,
      };
    default:
      return state;
  }
};

export default reducer;
