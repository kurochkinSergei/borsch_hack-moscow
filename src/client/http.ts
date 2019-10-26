/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import _get from 'lodash/get';

import { person } from './mock.js';

export const getLocale = () => axios.get('http://localhost:3001/locale');

export function authenticateUser(data: { username: string, password: string }) {
  return axios.post('/auth', data).then(response => response.data);
}

export function getGoogleClientId() {
  return axios.get('/getGoogleClientId').then(response => response.data);
}

export function authWithGoogle(credentials: any) {
  return axios.post('/auth/google', credentials).then(response => response.data)
    .catch(err => console.error(err));
}

export function getOfficialInfo({ id, office, year }: { id: number, office: number, year: number }) {
  return axios
    .get(`https://declarator.org/api/v1/search/sections/?person=${id}&office=${office}&year=${year}`)
    .then(response => _get(response.data, 'results[0]', null))
    .catch(err => {
      console.log('err', err)
      return _get(person, 'results[0]', null);
    });
}
