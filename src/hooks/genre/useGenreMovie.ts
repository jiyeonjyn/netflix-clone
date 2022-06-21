import { httpClient } from './../../service/http_client';
import { Genre } from './../../types/index';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient
    .get('genre/movie/list')
    .then((response) => response.data.genres);

export const useGenreMovie = () =>
  useQuery<Genre[]>(['genre', 'movie'], () => api());
