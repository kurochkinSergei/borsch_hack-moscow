import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import 'react-typist/dist/Typist.css';

import tuxedo from '../../static/sarkozy.png';

import './Round.scss';
import { colors } from 'storybook-directual';
import { TDataPrepared } from './Game';

const emojies: { [key: string]: any} = {
  pending: <span className="face">😐</span>,
  success: <span className="face">😅</span>,
  fail: <span className="face">😬</span>
}

interface RoundProps {
  data: TDataPrepared | null,
  setRound: any,
}

export const getRandomColor = (): { hex: string, name: string } => {
  const colorsKeys = Object.keys(colors);
  const colorIndx = Math.floor(Math.random() * colorsKeys.length);

  return colors[colorsKeys[colorIndx]];
};

const Round: React.FC<RoundProps> = ({ data }) => {
  const [color, setColor] = useState<string>('#fff');
  const [roundStatus, setStatus] = useState<string>('pending');
  // const [roundStarted, startRound] = useState<boolean>(false);
  // const [officialData, setOfficialData] = useState<TDataPrepared | null>(null);
  // const [score, setScore] = useState<TScore>({
  //   user: 0,
  //   machine: 0,
  // });

  useEffect(() => {
    setColor(getRandomColor().hex);
  }, [data]);

  return (
    <div className="round-wrapper">
      <div className="person">
        <div
          className="person-image-wrapper"
          style={{
            background: color,
            borderColor: color,
          }}
        >
          <img src={tuxedo} alt="tuxedo"></img>
          {emojies[roundStatus]}
        </div>
        <div className="person-desc">
          <div className="person-name Additional-Header_28-40_White">{data && data.name}</div>
          <div className="person-party Subheader_14-24_White">{data && data.partyName}</div>
          <div className="person-region Subheader_14-24_White">{data && data.regionName}</div>
        </div>
      </div>
    </div>
  )
};

export default Round;
