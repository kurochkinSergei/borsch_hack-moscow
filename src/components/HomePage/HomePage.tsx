import React, { useEffect, useState } from 'react';
import { Icon, colors } from 'storybook-directual';
import { useIntl } from 'react-intl';

import { useDates } from 'providers/StorybookProvider/withDates';

import PageLayout from '../PageLayout/PageLayout';
import Header from '../PageHeader/PageHeader';

import SideBar from './SideBar/SideBar';
import ActionPanel from './ActionPanel/ActionPanel';

import styles from './HomePage.module.scss';

interface IBabai {
  id: number,
  color: string,
  name: string,
}

const HomePage = () => {
  const { formatMessage } = useIntl();
  const [babais, setBabais] = useState([]);
  const Dates = useDates();

  // upload list of babais
  useEffect(() => {
    // getData().then(data => setBabais(data.payload));
  }, []);

  return (
    <PageLayout
      header={(
        <Header
          title={formatMessage({ id: 'hello' })}
          withSearch
          searchPlaceholder="Search"
          onSearch={(value: string) => { console.warn('search:::', value); }}
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
            {babais && babais.map((babai: IBabai, index) => (
              <Icon
                className={styles['spin-babai']}
                type="babai"
                style={{
                  color: colors[babai.color].hex,
                  animationDelay: `${index}s`,
                  animationDirection: index % 2 ? 'normal' : 'reverse',
                }}
              />
            ))}
          </div>
        </>
      )}
    />
  );
};

export default HomePage;
