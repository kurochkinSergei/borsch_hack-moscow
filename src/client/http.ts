/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// const API_SERVER = process.env.REACT_APP_API_SERVER || 'http://localhost:8081/good/api/v3/';

export const getLocale = () => axios.get('http://localhost:3001/locale');
