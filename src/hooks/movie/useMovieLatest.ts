import { httpClient } from './../../service/http_client';
import { Movie } from './../../types/index';
import { AxiosResponse, AxiosError } from 'axios';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient.get('movie/latest').then((response) => response.data);

export const useMovieLatest = useQuery<Movie>(['movie', 'latest'], () => api());
