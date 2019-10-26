import React from 'react';
import { useDispatch } from 'react-redux';
import Cookie from 'js-cookie';

import { Sidebar, IconButton } from 'storybook-directual';
import { SESSION_ID } from 'utils/constants';
import { logout as logoutAC } from 'redux/stores/user/actions';

const AppManagementSideBar = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAC());
    Cookie.remove(SESSION_ID);
  };

  return (
    <Sidebar
      navList={[
        <IconButton
          icon="logout"
          key="0"
          onClick={logout}
        />,
      ]}
    />
  );
};

export default AppManagementSideBar;
