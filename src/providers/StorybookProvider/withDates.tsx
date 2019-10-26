import React, { useContext } from 'react';

import { StorybookContext } from './StorybookProvider';

interface IDates {
  Dates: any;
}

export const withDates = <T extends IDates>(Component: React.ComponentType<T>) => (props: Omit<T, 'Dates'>) => (
  <StorybookContext.Consumer>
    { ({ Dates }) => (<Component {...props as T} Dates={Dates} />)}
  </StorybookContext.Consumer>
);

export const useDates = (): any => {
  const { Dates } = useContext(StorybookContext);

  return Dates;
};
