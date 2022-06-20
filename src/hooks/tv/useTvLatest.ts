import { TV } from './../../types/index';
import { httpClient } from './../../service/http_client';
import { useQuery } from 'react-query';

const api = async () =>
  await httpClient.get('tv/latest').then((response) => response.data);

export const useTvLatest = useQuery<TV>(['tv', 'latest'], () => api());
