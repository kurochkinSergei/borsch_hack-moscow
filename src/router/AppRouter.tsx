/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Switch,
  // Link,
} from 'react-router-dom';

import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';

// Page components
import HomePage from 'components/HomePage/HomePage';
import Game from 'components/Game/Game';

import Login from 'components/Login/Login';
import PrivateRoute from './PrivateRoute';
import { getAuthenticatedStatus } from '../redux/stores/user/getters';

interface IRouter {
  history: History,
}

const AppRouter: React.FC<IRouter> = ({ history }) => {
  // const isAuthenticated = useSelector(getAuthenticatedStatus);
  const isAuthenticated = true;

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
          exact
          history={history}
          component={HomePage}
          isAuthenticated={isAuthenticated}
        />

        {/* Home page */}
        <PrivateRoute
          path="/play-game"
          exact
          history={history}
          component={Game}
          isAuthenticated={isAuthenticated}
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
