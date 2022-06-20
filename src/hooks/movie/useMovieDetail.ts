import { httpClient } from '../../service/http_client';
import { useQuery } from 'react-query';
import { MovieDetail } from '../../types';

const api = async (id: number) =>
  await httpClient
    .get('movie', {
      params: {
        movie_id: id,
      },
    })
    .then((response) => response.data);

export const useMovieDetail = (id: number) =>
  useQuery<MovieDetail>(['movie', 'detail', id], () => api(id));
