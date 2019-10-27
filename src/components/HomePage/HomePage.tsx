import React from 'react';
// import { Icon, colors } from 'storybook-directual';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';


import PageLayout from '../PageLayout/PageLayout';
import Header from '../PageHeader/PageHeader';

import SideBar from './SideBar/SideBar';
import styles from './HomePage.module.scss';

import { Button } from 'storybook-directual';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <PageLayout
      header={(
        <Header
          title={<Typist
            startDelay={1000}
            avgTypingDelay={200}
            cursor={{
              show: true,
              blink: true,
              element: '|',
              hideWhenDone: false,
            }}
          >
            <span style={{ color: '#ed1f24'}}>
              DECLARATOR
            </span>
            &nbsp;&nbsp;F🖕CK CORRUPTION&nbsp;
          </Typist>}
        />
      )}
      sideBar={<SideBar />}
      // actionPanel={<ActionPanel />}
      content={(
        <>
          <h2 className="Mono_14-24_White" style={{
            fontSize: 24,
            textAlign: 'center',
            color: 'white',
            height: 200,
          }}>
            <Typist>
              Year 2019. The time has come<br></br>
              to challange artifitial intelligence<br></br>
              in a battle to determine<br></br>
              real income of public officials
            </Typist>
          </h2>
          <div style={{display: 'block', margin: 'auto', width: 100}}>
            <Link to="/play-game" >
              <Button style={{ height: 100 }}>
                PLAY
              </Button>
            </Link>
          </div>
        </>
      )}
    />
  );
};

export default HomePage;
