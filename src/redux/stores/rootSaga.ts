import { all } from 'redux-saga/effects';

import localeSagas from './locale/sagas';

const sagas = [
  ...localeSagas,
];

export default function* root() {
  yield all(sagas.map(saga => saga()));
}
