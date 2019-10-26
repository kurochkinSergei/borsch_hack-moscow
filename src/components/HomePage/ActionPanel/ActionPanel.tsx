import React from 'react';
import { AccentButton, Select } from 'storybook-directual';

import './ActionPanel.scss';


const appFilterOptions = [
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
];

const ActionPanel = () => {
  const initialValue = new Set([1]);

  return (
    <div className="action-panel">
      <AccentButton
        className="action-panel__control"
        onClick={() => { console.log('Do something'); }}
      >
        Do something
      </AccentButton>

      <div className="app-filter-select action-panel__control">
        <Select
          selected={initialValue}
          options={appFilterOptions}
          onChange={(key: string) => console.log('key::::', key)}
        />
      </div>
    </div>
  );
};

export default ActionPanel;
