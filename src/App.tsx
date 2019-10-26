/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { History } from 'history';
import Logger from 'utils/Logger';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ReduxIntlProvider from './providers/ReduxIntlProvider/ReduxIntlProvider';
import { StorybookProvider } from './providers/StorybookProvider/StorybookProvider';
import AppRouter from './router/AppRouter';

interface IApp {
  history: History,
  store: Store,
  logger: Logger,
}

const App: React.FC<IApp> = ({ history, store, logger }): ReactElement => (
  <Provider store={store}>
    <ErrorBoundary logger={logger}>
      <ReduxIntlProvider>
        <StorybookProvider>
          <AppRouter history={history} />
        </StorybookProvider>
      </ReduxIntlProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
