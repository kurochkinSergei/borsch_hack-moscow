import React from 'react';
import { Icon } from 'storybook-directual';
import { useIntl } from 'react-intl';

import { useDates } from 'providers/StorybookProvider/withDates';

import PageLayout from '../PageLayout/PageLayout';
import Header from '../PageHeader/PageHeader';

import SideBar from './SideBar/SideBar';
import ActionPanel from './ActionPanel/ActionPanel';

import styles from './HomePage.module.scss';


const HomePage = () => {
  const { formatMessage } = useIntl();
  const Dates = useDates();

  return (
    <PageLayout
      header={(
        <Header
          title={formatMessage({ id: 'hello' })}
          withSearch
          searchPlaceholder="Search"
          onSearch={(value: string) => { console.log('search:::', value); }}
        />
      )}
      sideBar={<SideBar />}
      actionPanel={<ActionPanel />}
      content={(
        <>
          <h2 className="Subheader_14-24_Black">
            Today&nbsp;is&nbsp;
            {Dates.getDateTime(new Date())}
          </h2>

          <div className={styles.content}>
            <div className={styles['babai-wrapper']}>
              <Icon className={styles['spin-babai']} type="babai" />
            </div>
          </div>
        </>
      )}
    />
  );
};

export default HomePage;
