import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import 'react-typist/dist/Typist.css';

import PageLayout from '../PageLayout/PageLayout';
import Header from '../PageHeader/PageHeader';

import { Button } from 'storybook-directual';
import Fighters from './Fighters';
import Round from './Round';
import { getOfficialInfo } from 'client/http';

type TScore = {
  user: number;
  machine: number;
}

const officials = [
  { id: 8, office: 14, year: 2010 }
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
    regionName: get(data, 'main.office.region', 'NO REGION')
  }
}

const Game = () => {
  const [round, setRound] = useState<number>(1);
  const [roundStarted, startRound] = useState<boolean>(false);
  const [officialData, setOfficialData] = useState<TDataPrepared | null>(null);
  const [score, setScore] = useState<TScore>({
    user: 0,
    machine: 0,
  });

  useEffect(() => {
    getOfficialInfo(officials[round - 1]).then(
      (result) => {
        console.log('RESULT:::', result);
        setOfficialData(prepareData(result));
      }
    );
  }, [round]);

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
            <div className="score">
              {score.user}&nbsp;:&nbsp;{score.machine}
            </div>
            <div className="fight-button">
              <Button onClick={() => startRound(true)}>
                Fight!
              </Button>
            </div>
          </>
        : <Round
          data={officialData}
          setRound={setRound}
          />
        }
        </>
      )}
    />
  );
};

export default Game;
