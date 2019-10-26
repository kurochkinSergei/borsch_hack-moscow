import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import 'react-typist/dist/Typist.css';

import tuxedo from '../../static/sarkozy.png';
import simple from '../../static/man-simple.png';
// @ts-ignore
import king from '../../static/king.jpg';

import './Round.scss';
import { colors, Button, Input } from 'storybook-directual';
import { TDataPrepared } from './Game';

import jiga from '../../static/cars/jiga.png';
// import niva from '../../static/cars/niva.jpg';
import prius from '../../static/cars/prius.png';
// @ts-ignore
import porsche from '../../static/cars/porsche.webp';
import estate from '../../static/house.png';
import { useStorybook } from 'storybook-directual';
import { requestScore } from 'client/http';

const cars = [
  jiga,
  // jiga,
  // jiga,
  // jiga,
  // jiga,
  // jiga,
  // // niva,
  // prius,
  // porsche,
]

const emojies: { [key: string]: any} = {
  simple: <span className="face">😐</span>,
  tuxedo: <span className="face">😄</span>,
  king: <span className="face">😊</span>
}

interface RoundProps {
  data: TDataPrepared | null,
  setRound: any,
  setScore: any,
  rawData: any,
}

export const getRandomColor = (): { hex: string, name: string } => {
  const colorsKeys = Object.keys(colors);
  const colorIndx = Math.floor(Math.random() * colorsKeys.length);

  return colors[colorsKeys[colorIndx]];
};

const getPersonSrc = (value: number) => {
  if (value < 100000) return simple;
  if (value >= 100000 && value < 200000) return tuxedo;
  if (value > 200000) return king;

  return simple;
}

const getPersonImgClass = (value: number) => {
  if (value < 100000) return 'simple';
  if (value >= 100000 && value < 200000) return 'tuxedo';
  if (value > 200000) return 'king';

  return 'simple';
}

const makeVehicles = (data: any) => {
  if (!data) return '';

  return data.vehicles.map((car: any, index: number) => (
    <div className="card">
      <img className="car-img" src={jiga} data-offset={index}></img>
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

const Round: React.FC<RoundProps> = ({ data, rawData, setScore, setRound }) => {
  const [color, setColor] = useState<string>('#fff');
  // pending -> result recieved
  const [roundStatus, setStatus] = useState<string>('pending');
  const [result, setResult] = useState();
  const [value, setValue] = useState(0);
  const { Numbers } = useStorybook();

  const onConfirm = () => {
    console.log('VALYE::', value);
    console.log('raw data', rawData);

    requestScore(rawData).then(result => {
      console.log('result:::', result);
      const { y_predict, y_true } = result;

      const robotDelta = Math.round((y_predict - y_true) / 1000);
      const yourDelta = Math.round((value*1000 - y_true) / 1000);

      setResult({
        y_predict: Math.round(y_predict / 1000),
        y_true: Math.round(y_true / 1000),
        robotDelta,
        yourDelta,
      });

      setStatus('result');
      setScore(result.yourDelta <= result.robotDelta ? 'user' : 'machine');
      //   setRound();
      // setTimeout(() => {
      //   setScore('user');
      //   setRound();
      // }, 5000);
    });
  }

  useEffect(() => {
    setColor(getRandomColor().hex);
  }, []);

  return (
    <div className="round-wrapper">
      <div className="results">
        { roundStatus === 'result'
          && <div className="result wrapper">
            <div className="correct Header_32-40_White">
              Correct answer: {Numbers.separate(result.y_true)}K&nbsp;
              <Button onClick={setRound}>Next round</Button>
            </div>
            <div className="answers">
              <span className={Math.abs(result.yourDelta) <= Math.abs(result.robotDelta) ? 'right' : ''}>
                Your answer: {Numbers.separate(value)}K&nbsp;
                ({result.yourDelta < 0 ? '-' : '+'}
                {Numbers.separate(Math.abs(result.yourDelta))}
                K)
              </span>
              <span className={Math.abs(result.yourDelta) > Math.abs(result.robotDelta) ? 'right' : ''}>
                FEDOR's answer: {Numbers.separate(result.y_predict)}K&nbsp;({result.robotDelta < 0 ? '-' : '+'}
                {Numbers.separate(Math.abs(result.robotDelta))}K)
              </span>
            </div>
          </div>
        }
        <div className="form" style={roundStatus === 'result' ? { display: 'none' } : undefined}>
          <label>
            <div style={{ color: 'white', margin: '5px 15px'}}>
              Mounthly salary {Numbers.separate(value)}K ₽
            </div>
            <Input
              type="number"
              value={value}
              onChange={(event: any) => {
                const value = event.target.value;
                if (value > 10000000) return;
 
                setValue(value)
              }}
            />
          </label>
          
          {rawData && <Button onClick={onConfirm}>
            Confirm
          </Button>}
        </div>
      </div>
      
      <div className="person">
        <div>
          <div
            className={`person-image-wrapper ${getPersonImgClass(value)}`}
            // style={{
            //   background: color,
            //   borderColor: color,
            // }}
          >
            <img src={getPersonSrc(value)} alt="person"></img>
            {emojies[getPersonImgClass(value)]}
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
