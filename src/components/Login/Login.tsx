import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
// import Cookie from 'js-cookie';
import { AccentButton, Input } from 'storybook-directual';
// import SESSION_ID from 'utils/constants';
import { getAuthenticatedStatus } from 'redux/stores/user/getters';
import { setUserInfo } from 'redux/stores/user/actions';
// import _get from 'lodash/get';
import styles from './login.module.scss';

const mapStateToProps = (state: any) => ({
  isAuthenticated: getAuthenticatedStatus(state),
});

const mapDispatchToProps = {
  setUserInfo,
};

interface IProps {
  setUserInfo: (user: object) => void,
}

interface IState {
  email: string,
  password: string,
}

class Login extends React.Component<IProps, IState> {
  state = {
    email: '',
    password: '',
  };

  onLogin = () => {
    // const { email, password } = this.state;
    // authenticateUser({ username: email, password })
    //   .then((res: any) => {
    //     const { setUserInfo: setUserInfoAction } = this.props;
    //     const sessionId = _get(res, 'sessionid', '');
    //     Cookie.set(SESSION_ID, sessionId);
    //     const user = _get(res, ['collections', 'sysInfo', 'user'], {});
    //     setUserInfoAction(user);
    //   });
  };

  onChange = (field: 'email' | 'password') => (value: string) => {
    // @ts-ignore
    this.setState({
      [field]: value,
    });
  };

  render(): ReactNode {
    const { email, password } = this.state;
    return (
      <div className={styles.container}>
        <Input.Text value={email} onChange={this.onChange('email')} />
        <Input.Text value={password} onChange={this.onChange('password')} />
        <AccentButton onClick={this.onLogin}>Login</AccentButton>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
