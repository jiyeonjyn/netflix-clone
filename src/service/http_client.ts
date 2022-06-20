import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: { api_key: process.env.REACT_APP_TMDB_API_KEY },
});
