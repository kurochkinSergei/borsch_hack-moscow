import React, { useEffect, useState } from 'react';
import cn from 'classnames';
// import { Icon, colors } from 'storybook-directual';
import './Fighters.scss';

import leftF from 'static/scorpion_ultimate.png'
import rightF from 'static/fedor.png'

const Fighters = () => {
  const [startAnimation, setStartAnimation] = useState(false);
 
  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div className="fighters">
      <div className={cn('fighter','fighter_left', {
        animate: startAnimation})}>
        <img src={leftF}></img>
      </div>
      <div className={cn('fighter','fighter_right', {
        animate: startAnimation})}>
        <img src={rightF}></img>
      </div>
    </div>
  );
};

export default Fighters;
