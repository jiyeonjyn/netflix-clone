import { ListResponse, Movie } from './../../types/index';
import { useQuery } from 'react-query';
import { httpClient } from '../../service/http_client';

const api = async () =>
  await httpClient.get('tv/popular').then((response) => response.data);

export const useTvPopular = () =>
  useQuery<ListResponse<Movie>>(['tv', 'popular'], () => api());
