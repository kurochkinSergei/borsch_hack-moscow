/* eslint-disable react/prop-types */
import React from 'react';
// import { useSelector } from 'react-redux';
import {
  Route,
  Switch,
  // Link,
} from 'react-router-dom';

import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';

// Page components
import Login from 'components/Login/Login';
import HomePage from 'components/HomePage/HomePage';

import PrivateRoute from './PrivateRoute';
// import { getAuthenticatedStatus } from '../redux/stores/user/getters';

interface IRouter {
  history: History,
}

// eslint-disable-next-line arrow-body-style
const AppRouter: React.FC<IRouter> = ({ history }) => {
  // const isAuthenticated = useSelector(getAuthenticatedStatus);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {/* Login page */}
        <Route
          exact
          path="/login"
          component={Login}
        />

        {/* Home page */}
        <PrivateRoute
          path="/"
          history={history}
          component={HomePage}
          isAuthenticated
        />

        {/* 404 */}
        <Route
          component={() => (<>Page not found</>)}
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default AppRouter;
