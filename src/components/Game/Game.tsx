import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import 'react-typist/dist/Typist.css';

import PageLayout from '../PageLayout/PageLayout';
import Header from '../PageHeader/PageHeader';

import { Button } from 'storybook-directual';
import Fighters from './Fighters';
import HealthBar from '../HealthBar/HealthBar';
import Round from './Round';
import GameOver from './GameOver';
import { getOfficialInfo } from 'client/http';

type TScore = {
  user: number;
  machine: number;
}

const officials = [
  // { id: 8, office: 14, year: 2010 }
  { id: 558, office: 124, year: 2018 },
  { id: 562, office: 126, year: 2018 },
  { id: 203, office: 123, year: 2018 },
  { id: 21002, office: 1397, year: 2018 },
  { id: 132632, office: 453, year: 2018 }
];

export type TDataPrepared = {
  name: string,
  officeName: string,
  partyName: string,
  regionName: string,
  realEstates: any[],
  vehicles: any[],
}

const prepareData = (data: any) => {
  return {
    name: get(data, 'main.person.name', 'NO NAME'),
    officeName: get(data, 'main.office.name', 'NO OFFICE'),
    partyName: get(data, 'main.party.name', 'NO PARTY'),
    realEstates: get(data, 'real_estates', []),
    vehicles: get(data, 'vehicles', []),
    regionName: get(data, 'main.office.region.name', 'NO REGION'),
  }
}

const Game = () => {
  const [round, setRound] = useState<number>(1);
  const [roundStarted, startRound] = useState<boolean>(false);
  const [officialData, setOfficialData] = useState<TDataPrepared | null>(null);
  const [rawData, setRawData] = useState<TDataPrepared | null>(null);
  const [score, setScore] = useState<TScore>({
    user: 0,
    machine: 0,
  });

  useEffect(() => {
    getOfficialInfo(officials[round - 1]).then(
      (result) => {
        setRawData(result)
        setOfficialData(prepareData(result));
      }
    );
  }, [round]);

  const gameOver = score.user === 3 || score.machine === 3;

  const tryAgain = () => {
    startRound(false);
    setRound(1);

    setScore({
      user: 0,
      machine: 0,
    })
  }

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
              color: 'rgb(237, 31, 36)',
            }}
            className="Mono_14-24_White"
          >
            <HealthBar score={score.machine} name="Player 1" player={1} />
            <HealthBar score={score.user} name="FEDOR THE LEARNED MACHINE" player={2}/>
            ROUND {round}
          </div>}
        />
      )}
      content={(
        <>
        {
          gameOver && <GameOver score={score} tryAgain={tryAgain}/>
        }
        {
          !roundStarted && !gameOver
          && <>
            <Fighters />
            <div className="score">
              {score.user}&nbsp;:&nbsp;{score.machine}
            </div>
            <div className="fight-button">
              <Button onClick={() => startRound(true)}>
                Fight!
              </Button>
            </div>
          </>
        }
        {
        
          roundStarted && !gameOver &&
          <Round
          data={officialData}
          setRound={() => {
            setRound(round + 1)
            startRound(false);
          }}
          rawData={rawData}
          // @ts-ignore
          setScore={(key: string) => setScore({...score, [key]: (score[key] + 1) }) }
          />
        }
        </>
      )}
    />
  );
};

export default Game;
