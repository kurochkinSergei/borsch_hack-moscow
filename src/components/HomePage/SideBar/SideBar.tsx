import React from 'react';

import { Sidebar, IconButton } from 'storybook-directual';

// eslint-disable-next-line arrow-body-style
const AppManagementSideBar = () => {
  return (
    <Sidebar
      navList={[
        <IconButton
          icon="user"
          key="0"
        />,
        <IconButton
          icon="settings"
          key="1"
        />,
      ]}
    />
  );
};

export default AppManagementSideBar;
