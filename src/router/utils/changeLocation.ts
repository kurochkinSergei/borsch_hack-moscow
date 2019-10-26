import { History } from 'history';

const changeLocation = (history: History) => {
  const { location } = history;
  if (location.state && location.state.nextPathname) {
    history.push(location.state.nextPathname);
  } else {
    history.push('/');
  }
};

export default changeLocation;
