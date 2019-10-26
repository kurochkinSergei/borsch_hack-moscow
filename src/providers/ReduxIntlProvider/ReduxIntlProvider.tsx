import React, { ReactNode, ReactNodeArray } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { getLocaleName, getLocaleMessages } from 'redux/stores/locale/getters';

interface IProvider {
  children: ReactNode | ReactNodeArray
}

const ReduxIntlProvider = ({ children }: IProvider) => {
  const localeName = useSelector(getLocaleName);
  const messages = useSelector(getLocaleMessages);
  return (
    <IntlProvider locale={localeName} messages={messages[localeName]}>
      {children}
    </IntlProvider>
  );
};

export default ReduxIntlProvider;
