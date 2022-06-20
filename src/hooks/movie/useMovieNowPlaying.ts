import { httpClient } from './../../service/http_client';
import { ListResponse, Movie } from './../../types/index';
import { AxiosResponse, AxiosError } from 'axios';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient.get('movie/now_playing').then((response) => response.data);

export const useMovieNowPlaying = () =>
  useQuery<ListResponse<Movie>>(['movie', 'now_playing'], () => api());
