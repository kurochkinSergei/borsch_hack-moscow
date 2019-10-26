import React from 'react';
import { Button, Select } from 'storybook-directual';

import './ActionPanel.scss';


const appFilterOptions = [
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
];

const ActionPanel = () => {
  const initialValue = '';

  return (
    <div className="action-panel">
      <div className="app-filter-select action-panel__control">
        <Select
          placeholder="Hello there"
          selected={initialValue}
          options={appFilterOptions}
          onChange={(key: string) => console.warn('key::::', key)}
        />
      </div>
    </div>
  );
};

export default ActionPanel;
