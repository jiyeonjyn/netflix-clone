import { ListResponse, TV } from './../../types/index';
import { httpClient } from './../../service/http_client';
import { useQuery } from 'react-query';

const api = async (query: string) =>
  await httpClient
    .get('search/tv', {
      params: {
        query,
      },
    })
    .then((response) => response.data);

export const useSearchTv = (query: string) =>
  useQuery<ListResponse<TV>>(['search', 'tv', query], () => api(query));
