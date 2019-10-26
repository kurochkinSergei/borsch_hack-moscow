import React, { ReactNode, ReactNodeArray, createContext } from 'react';
import { useSelector } from 'react-redux';
import { Dates } from 'storybook-directual';

import { getLocaleName } from 'redux/stores/locale/getters';

interface IProvider {
  children: ReactNode | ReactNodeArray
}

export const StorybookContext = createContext({
  Dates: null,
  // Numbers: null,
});


export const StorybookProvider = ({ children }: IProvider) => {
  const localeName = useSelector(getLocaleName);
  // const DatesSingleton = new Dates();`

  Dates.locale = localeName;

  return (
    <StorybookContext.Provider
      value={{ Dates }}
    >
      {children}
    </StorybookContext.Provider>
  );
};
