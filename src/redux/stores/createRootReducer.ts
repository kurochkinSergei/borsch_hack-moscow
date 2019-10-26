import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import userModuleName from './user/constants';
import userReducer from './user/reducer';
import localeModuleName from './locale/constants';
import localeReducer from './locale/reducer';

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  [userModuleName]: userReducer,
  [localeModuleName]: localeReducer,
});

export default createRootReducer;
