import React, { useState } from 'react';
import 'react-typist/dist/Typist.css';

import PageLayout from '../PageLayout/PageLayout';
import Header from '../PageHeader/PageHeader';

import { Button } from 'storybook-directual';
import Fighters from './Fighters';
import { Link } from 'react-router-dom';

const Game = () => {
  const [round, setRound] = useState(1);
  const [roundStarted, startRound] = useState(false);

  return (
    <PageLayout
      header={(
        <Header
          title={
          <div
            style={{
              textAlign: 'center',
              fontSize: 36,
              width: '100%',
              color: 'white',
            }}
            className="Mono_14-24_White"
          >
            ROUND {round}
          </div>}
        />
      )}
      content={(
        <>
        {
          !roundStarted
          ? <>
            <Fighters />
            
            <div className="fight-button">
              <Button>
                Fight!
              </Button>
            </div>
          </>
        // : <Round />
        : null
        }
        </>
      )}
    />
  );
};

export default Game;
