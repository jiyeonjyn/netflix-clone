import { ListResponse, Movie } from './../../types/index';
import { httpClient } from './../../service/http_client';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient.get('movie/top_rated').then((response) => response.data);

export const useMovieTopRated = () =>
  useQuery<ListResponse<Movie>>(['movie', 'top_rated'], () => api());
