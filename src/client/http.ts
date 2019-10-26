/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import _get from 'lodash/get';

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


