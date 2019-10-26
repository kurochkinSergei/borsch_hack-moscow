import React from 'react';
import './HealthBar.scss';

interface THealthBarProps {
  name: string,
  player: number,
  score: number,
}

const HealthBar: React.FC<THealthBarProps> = ({ name, player, score = 0 }) => {
  return (
    <div className={`bar bar-p${player} score-${score}`}>
      <div className="player-name">{name}</div>
      {/* <div className="speed"></div> */}
    </div>
  );
}

export default HealthBar;
