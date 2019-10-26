import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import 'react-typist/dist/Typist.css';

import tuxedo from '../../static/sarkozy.png';
import simple from '../../static/man-simple.png';
// import king from '../../static/king.png';

import './Round.scss';
import { colors, Button, Input } from 'storybook-directual';
import { TDataPrepared } from './Game';

import jiga from '../../static/cars/jiga.png';
// import niva from '../../static/cars/niva.jpg';
import prius from '../../static/cars/prius.png';
// @ts-ignore
import porsche from '../../static/cars/porsche.webp';
import estate from '../../static/house.png';

const cars = [
  jiga,
  jiga,
  jiga,
  jiga,
  jiga,
  jiga,
  // niva,
  prius,
  porsche,
]

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

const getPersonSrc = (value: number) => {
  if (value < 100000) return simple;
  if (value > 100000 && value < 200000) return tuxedo;
  // if (value > 200000) return king;
}

const makeVehicles = (data: any) => {
  if (!data) return '';

  return data.vehicles.map((car: any, index: number) => (
    <div className="card">
      <img className="car-img" src={cars[index]} data-offset={index}></img>
      <div>
      {[
        get(car, 'type.name', ''),
        get(car, 'brand.name', ''),
      ].filter(Boolean).join(': ')}
      </div>
    </div>
  ));
}

const makeEstates = (data: any) => {
  if (!data) return '';

  return data.realEstates.map((flat: any) => 
    (
      <div className="card">
        <img className="car-img" src={estate}></img>
        <div>
        {get(flat, 'type.name', '')},{' '}
        {get(flat, 'region.name', '')},{' '}
        {get(flat, 'square', '')} m<sup>2</sup>
        </div>
      </div>
    ));
}

const Round: React.FC<RoundProps> = ({ data }) => {
  const [color, setColor] = useState<string>('#fff');
  const [roundStatus, setStatus] = useState<string>('pending');
  const [value, setValue] = useState();
  // const [roundStarted, startRound] = useState<boolean>(false);
  // const [officialData, setOfficialData] = useState<TDataPrepared | null>(null);
  // const [score, setScore] = useState<TScore>({
  //   user: 0,
  //   machine: 0,
  // });

  useEffect(() => {
    setColor(getRandomColor().hex);
  }, []);

  return (
    <div className="round-wrapper">
      <div className="results">
        <div className="form">
          <label>
            <div style={{ color: 'white', margin: '5px 15px'}}>Enter public official income</div>
            <Input
              type="number"
              value={value}
              onChange={(event: any) => setValue(event.target.value)}
            />
          </label>
          <Button onClick={() => {}}>
            Confirm
          </Button>
        </div>
      </div>
      
      <div className="person">
        <div>
          <div
            className="person-image-wrapper"
            style={{
              background: color,
              borderColor: color,
            }}
          >
            <img src={getPersonSrc(value)} alt="person"></img>
            {emojies[roundStatus]}
          </div>
          <div className="person-desc">
            <div className="person-name Additional-Header_28-40_White">{data && data.name}</div>
            <div className="person-party Subheader_14-24_White">{data && data.partyName}</div>
            <div className="person-region Subheader_14-24_White">{data && data.regionName}</div>
          </div>
        </div>

        <div className="info">
          <div className="info-row">
            <div className="title Header_32-40_White">Real estate</div>
            <div className="cards">{makeEstates(data)}</div>
          </div>
          <div className="info-row">
            <div className="title Header_32-40_White">Vehicles</div>
            <div className="cards">{makeVehicles(data)}</div>
            {/* <div className="desc">{makeVehicles(data)}</div> */}
          </div>
          {/* <div className="info-row">
            <div className="title">Vehicles</div>
            <div className="images"></div>
            <div className="desc"></div>
          </div> */}
        </div>
      </div>
    </div>
  )
};

export default Round;
