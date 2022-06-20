import { httpClient } from './../../service/http_client';
import { ListResponse, Movie } from './../../types/index';
import { useQuery } from 'react-query';

const api = async (query: string) =>
  await httpClient
    .get('search/movie', {
      params: {
        query,
      },
    })
    .then((response) => response.data);

export const useSearchMovie = (query: string) =>
  useQuery<ListResponse<Movie>>(['search', 'movie', query], () => api(query));
