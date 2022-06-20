import { ListResponse, TV } from './../../types/index';
import { httpClient } from './../../service/http_client';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient.get('tv/on_the_air').then((response) => response.data);

export const useTvOnTheAir = () =>
  useQuery<ListResponse<TV>>(['tv', 'on_the_air'], () => api());
