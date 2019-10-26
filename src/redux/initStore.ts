import { Store } from 'redux';
import { getLocale } from 'redux/stores/locale/actions';

export default (store: Store) => {
  store.dispatch(getLocale());
};
