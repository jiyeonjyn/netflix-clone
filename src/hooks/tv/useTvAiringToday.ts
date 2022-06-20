import { ListResponse, TV } from './../../types/index';
import { httpClient } from './../../service/http_client';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient.get('tv/airing_today').then((response) => response.data);

export const useTvAiringToday = () =>
  useQuery<ListResponse<TV>>(['tv', 'airing_today'], () => api());
