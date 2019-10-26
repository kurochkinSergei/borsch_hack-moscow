/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { History } from 'history';


interface IRoute {
  component: any,
  history: History,
  path: string,
  isAuthenticated: boolean,
  [key: string]: any,
}

const PrivateRoute: React.FC<IRoute> = ({
  component: Component, history, isAuthenticated, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated
        ? (<Component {...props} />)
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
                nextPathname: history.location.pathname,
              },
            }}
          />
        )
    )}
  />
);

export default PrivateRoute;
