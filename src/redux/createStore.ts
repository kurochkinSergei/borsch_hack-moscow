import { createStore, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './stores/createRootReducer';
import rootSaga from './stores/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (history: History): Store => {
  const rootReducer = createRootReducer(history);
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(...middlewares),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
