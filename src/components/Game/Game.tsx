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
  {id: 132893, office: 4206, year: 2018},
  {id: 59465, office: 1276, year: 2018},
  {id: 8944, office: 5, year: 2018},
  {id: 132713, office: 547, year: 2018},
  {id: 2575, office: 584, year: 2018},
  {id: 12110, office: 116, year: 2018},
  {id: 59025, office: 1273, year: 2018},
  {id: 59500, office: 1179, year: 2018},
  {id: 58238, office: 1199, year: 2018},
  {id: 28329, office: 1250, year: 2018},
  {id: 53104, office: 1272, year: 2018},
  {id: 21002, office: 1397, year: 2018},
  {id: 133494, office: 6506, year: 2018},
  {id: 32349, office: 113, year: 2018},
  {id: 57799, office: 608, year: 2018},
  {id: 59298, office: 1179, year: 2018},
  {id: 133034, office: 6101, year: 2018},
  {id: 1408, office: 106, year: 2018},
  {id: 717, office: 5, year: 2018},
  {id: 12089, office: 116, year: 2018},
  {id: 39040, office: 5, year: 2018},
  {id: 3440, office: 993, year: 2018},
  {id: 132357, office: 612, year: 2018},
  {id: 15088, office: 543, year: 2018},
  {id: 13721, office: 570, year: 2018},
  {id: 54344, office: 1260, year: 2018},
  {id: 133365, office: 167, year: 2018},
  {id: 24478, office: 1, year: 2018},
  {id: 59048, office: 1240, year: 2018},
  {id: 23644, office: 954, year: 2018},
  {id: 132682, office: 547, year: 2018},
  {id: 10117, office: 1192, year: 2018},
  {id: 58520, office: 1195, year: 2018},
  {id: 34216, office: 1187, year: 2018},
  {id: 8943, office: 5, year: 2018},
  {id: 917, office: 5, year: 2018},
  {id: 59443, office: 1270, year: 2018},
  {id: 11550, office: 584, year: 2018},
  {id: 133409, office: 163, year: 2018},
  {id: 133323, office: 167, year: 2018},
  {id: 57952, office: 55, year: 2018},
  {id: 15077, office: 543, year: 2018},
  {id: 57812, office: 608, year: 2018},
  {id: 33598, office: 4, year: 2018},
  {id: 32028, office: 546, year: 2018},
  {id: 47074, office: 4203, year: 2018},
  {id: 57924, office: 31, year: 2018},
  {id: 67419, office: 6101, year: 2018},
  {id: 42034, office: 612, year: 2018},
  {id: 57580, office: 570, year: 2018},
  {id: 5727, office: 1151, year: 2018},
  {id: 13644, office: 113, year: 2018},
  {id: 9119, office: 5, year: 2018},
  {id: 47087, office: 4204, year: 2018},
  {id: 59068, office: 1240, year: 2018},
  {id: 60010, office: 1271, year: 2018},
  {id: 23128, office: 947, year: 2018},
  {id: 132349, office: 612, year: 2018},
  {id: 58490, office: 1186, year: 2018},
  {id: 32343, office: 267, year: 2018},
  {id: 133213, office: 6101, year: 2018},
  {id: 13735, office: 570, year: 2018},
  {id: 133531, office: 776, year: 2018},
  {id: 645, office: 226, year: 2018},
  {id: 9432, office: 4205, year: 2018},
  {id: 133219, office: 6101, year: 2018},
  {id: 60005, office: 1271, year: 2018},
  {id: 47071, office: 4203, year: 2018},
  {id: 15068, office: 543, year: 2018},
  {id: 51942, office: 1267, year: 2018},
  {id: 133005, office: 6101, year: 2018},
  {id: 126498, office: 471, year: 2018},
  {id: 47096, office: 4204, year: 2018},
  {id: 22053, office: 14, year: 2018},
  {id: 28266, office: 1, year: 2018},
  {id: 39420, office: 6101, year: 2018},
  {id: 59100, office: 1178, year: 2018},
  {id: 59654, office: 1265, year: 2018},
  {id: 58645, office: 1174, year: 2018},
  {id: 60678, office: 1271, year: 2018},
  {id: 133000, office: 6101, year: 2018},
  {id: 59518, office: 1193, year: 2018},
  {id: 58896, office: 1275, year: 2018},
  {id: 1885, office: 14, year: 2018},
  {id: 12100, office: 116, year: 2018},
  {id: 9125, office: 14, year: 2018},
  {id: 23129, office: 947, year: 2018},
  {id: 31983, office: 14, year: 2018},
  {id: 525, office: 14, year: 2018},
  {id: 33563, office: 167, year: 2018},
  {id: 59954, office: 1254, year: 2018},
  {id: 42003, office: 612, year: 2018},
  {id: 14910, office: 950, year: 2018},
  {id: 133192, office: 6101, year: 2018},
  {id: 15156, office: 951, year: 2018},
  {id: 58510, office: 1195, year: 2018},
  {id: 67150, office: 6101, year: 2018},
  {id: 132989, office: 49, year: 2018},
  {id: 67378, office: 6101, year: 2018},
  {id: 1023, office: 5, year: 2018},
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

const getRandomOfficials = (data: any[]) => {
  const ROUNDS = 5;
  const res = [];

  let indexes = data.map((item, index) => index);

  for (let i = 0; i < ROUNDS; i += 1) {
    const randIndex = Math.floor(Math.random() * (indexes.length));
    res.push(data[indexes[randIndex]]);
    indexes = indexes.filter((index, idx) => (idx !== randIndex));
  } return res;
};

const Game = () => {
  const [round, setRound] = useState<number>(1);
  const [tryN, setTryN] = useState(0);
  const [roundStarted, startRound] = useState<boolean>(false);
  const [officialData, setOfficialData] = useState<TDataPrepared | null>(null);
  const [rawData, setRawData] = useState<TDataPrepared | null>(null);
  const [officialsData, setOfficialsData] = useState(officials);

  const [score, setScore] = useState<TScore>({
    user: 0,
    machine: 0,
  });


  useEffect(() => {
    setOfficialsData(getRandomOfficials(officials));
   }, [tryN]);
 
   useEffect(() => {
     const official = officialsData[round - 1];
     if (!official) return;

     getOfficialInfo(official).then(
       (result) => {
         setRawData(result)
         setOfficialData(prepareData(result));
       }
     );
   }, [round, officialsData]);

  const gameOver = score.user === 3 || score.machine === 3;

  const tryAgain = () => {
    startRound(false);
    setRound(1);
    setTryN(tryN + 1);

    setScore({
      user: 0,
      machine: 0,
    });
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
