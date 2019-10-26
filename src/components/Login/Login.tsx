/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React, { ReactNode, ChangeEvent } from 'react';

import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import { Input, Notification, Button } from 'storybook-directual';
import _get from 'lodash/get';
import { History } from 'history';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { STATUS, SESSION_ID } from 'utils/constants';
import { getAuthenticatedStatus } from 'redux/stores/user/getters';
import { setUserInfo } from 'redux/stores/user/actions';
import changeLocation from 'router/utils/changeLocation';


import {
  // getUser,
  authenticateUser,
  getGoogleClientId,
  authWithGoogle,
} from 'client/http';

import styles from './login.module.scss';

const mapStateToProps = (state: any) => ({
  isAuthenticated: getAuthenticatedStatus(state),
});

const mapDispatchToProps = {
  setUserInfo,
};

type TFields = 'email' | 'password';

interface IProps {
  setUserInfo: (user: object) => void,
  history: History,
}

interface IState {
  email: string;
  password: string;
  error: string;
  GOOGLE_CLIENT_ID?: string;
}

class Login extends React.Component<IProps, IState> {
  state = {
    email: '',
    password: '',
    error: '',
    GOOGLE_CLIENT_ID: '',
  };

  componentDidMount() {
    getGoogleClientId()
      .then(clientId => this.setState({ GOOGLE_CLIENT_ID: clientId }))
      .catch(err => console.error(err));
  }

  onLogin = () => {
    const { email, password } = this.state;
    const { history } = this.props;

    authenticateUser({ username: email, password })
      .then((res: any) => {
        if (res.status === STATUS.ERROR) {
          this.setErrorMessage(res.msg);
          return;
        }

        const { setUserInfo: setUserInfoAction } = this.props;

        const sessionId = _get(res, 'token', '');
        Cookie.set(SESSION_ID, sessionId);
        const user = _get(res, 'result', {});
        setUserInfoAction(user);

        changeLocation(history);
      });
  };

  onChange = (field: TFields) => (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (!target) return;
    const { value }: {value: string} = target;
    // @ts-ignore
    this.setState({
      [field]: value,
    });
  };

  clearInput = (field: TFields) => {
    // @ts-ignore
    this.setState({
      [field]: '',
    });
  };

  setErrorMessage = (msg: string) => {
    this.setState({
      error: msg,
    });
  };

  onLogInWithGoogle = (credentials: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   authWithGoogle(credentials)
  //     .then(response => {
  //       if (response.status === STATUS.ERROR) {
  //         this.setErrorMessage(response.msg);
  //         return;
  //       }

  //       getUser(response.result.username)
  //         .then(profileData => {
  //           const sessionId = _get(response, 'result.token', '');

  //           const user = {
  //             id: profileData.id,
  //             user_id: profileData.id,
  //             role: profileData.role,
  //             isAuthenticate: true,
  //             token: sessionId,
  //             username: response.result.username,
  //             admin_id: profileData.admin_id || '',
  //             responsibilities: profileData.responsibilities,
  //           };

  //           const { setUserInfo: setUserInfoAction, history } = this.props;

  //           Cookie.set(SESSION_ID, sessionId);
  //           setUserInfoAction(user);

  //           changeLocation(history);
  //         });
  //     })
  //     .catch(error => { throw (error); });
  };


  render(): ReactNode {
    const {
      email,
      password,
      error,
      GOOGLE_CLIENT_ID,
    } = this.state;

    return (
      <div className={styles.container}>
        <h1 className="Header_32-40_Black">Please login</h1>
        <div className={styles.row}>
          <label className="Comment_12-16" htmlFor="email">
            <span>Email</span>
          </label>

          <Input
            id="email"
            value={email}
            onChange={this.onChange('email' as TFields)}
            onClose={() => this.clearInput('email')}
          />
        </div>

        <div className={styles.row}>
          <label className="Comment_12-16" htmlFor="email">
            <span>Password</span>
          </label>

          <Input
            id="password"
            type="password"
            value={password}
            onChange={this.onChange('password' as TFields)}
            onClose={() => this.clearInput('password')}
          />
        </div>

        <div className={styles['login-buttons']}>
          {
            GOOGLE_CLIENT_ID
            && (
              <GoogleLogin
                responseType="code"
                clientId={GOOGLE_CLIENT_ID}
                onFailure={err => console.error('err', err)}
                onSuccess={this.onLogInWithGoogle}
                render={renderProps => (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Login with Google
                  </Button>
                )}
              />
            )
          }

          <Button type="accent" onClick={this.onLogin}>Login</Button>
        </div>

        {
          error && (
            <Notification
              header="Error"
              message={error}
              onExit={() => this.setErrorMessage('')}
              type="error"
            />
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
