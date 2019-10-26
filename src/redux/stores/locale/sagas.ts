import { takeLatest, put } from 'redux-saga/effects';
import { getLocale } from 'client/http';
import {
  getLocale as getLocaleAction, getLocaleSuccess, getLocaleError,
} from './actions';

function* getLocaleAsync() {
  try {
    const result = yield getLocale();
    const messages = result.data;
    yield put(getLocaleSuccess(messages));
  } catch (e) {
    yield put(getLocaleError(e));
  }
}

function* getLocaleSaga() {
  yield takeLatest(getLocaleAction().type, getLocaleAsync);
}

export default [
  getLocaleSaga,
];
