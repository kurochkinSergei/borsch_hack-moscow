import React from 'react';
import { Button } from 'storybook-directual';

import './ActionPanel.scss';
import { Link } from 'react-router-dom';


const appFilterOptions = [
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
];

const ActionPanel = () => {
  return (
    <div className="action-panel">
      <div className="app-filter-select action-panel__control">
        <Link to="/play-game">
          <Button>
            NEW GAME
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ActionPanel;
