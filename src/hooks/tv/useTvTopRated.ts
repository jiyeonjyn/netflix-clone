import { httpClient } from './../../service/http_client';
import { ListResponse, TV } from './../../types/index';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient.get('tv/top_rated').then((response) => response.data);

export const useTvTopRated = () =>
  useQuery<ListResponse<TV>>(['tv', 'top_rated'], () => api());
