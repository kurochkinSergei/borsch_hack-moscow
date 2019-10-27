import React from 'react';
import { Button } from 'storybook-directual';


interface TGameOverProps {
  tryAgain: () => any,
  score: {
    user: number,
    machine: number,
  },
}

const HealthBar: React.FC<TGameOverProps> = ({ tryAgain, score }) => {
  const isUserWon = score.user === 3;

  return (
    <div className="game-over">
      {isUserWon && <div className="Header_32-40_White">Congradulations, you've won!</div>}
      {!isUserWon && <div className="Header_32-40_White">Sorry, Fedor was stronger!</div>}
      <Button onClick={tryAgain}>Try again</Button>
    </div>
  );
}

export default HealthBar;
