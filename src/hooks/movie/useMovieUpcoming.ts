import { httpClient } from './../../service/http_client';
import { ListResponse, Movie } from './../../types/index';
import { AxiosResponse, AxiosError } from 'axios';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient.get('movie/upcoming').then((response) => response.data);

export const useMovieUpcoming = () =>
  useQuery<ListResponse<Movie>>(['movie', 'upcoming'], () => api());
