import React from 'react';

// $FlowFixMe
import './index.scss';


interface Props {
  header?: any,
  content?: any,
  sideBar?: any,
  actionPanel?: any,
}

const PageLayout = ({
  header = null,
  content = null,
  sideBar = null,
  actionPanel = null,
}: Props) => (
  <div className="default-layout">
    <div className="header-wrapper">
      {header}
    </div>

    <div className="action-panel-wrapper">
      {actionPanel}
    </div>

    <aside className="sidebar-wrapper">
      {sideBar}
    </aside>

    <div className="content-wrapper">
      {content}
    </div>
  </div>
);

export default PageLayout;
