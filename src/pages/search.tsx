import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Detail from '../components/detail';
import Slider from '../components/slider';
import { useSearchMovie } from '../hooks/search/useSearchMovie';
import { useSearchTv } from '../hooks/search/useSearchTv';

const Container = styled.section`
  min-height: 100vh;
  overflow: hidden;
  padding-top: 100px;
  section {
    margin-bottom: 30px;
  }
`;

const Search = () => {
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const navigate = useNavigate();

  useEffect(() => {
    !query.get('query') && navigate('/');
  }, [query, navigate]);

  const { data: movieData } = useSearchMovie(query.get('query') || '');
  const { data: tvData } = useSearchTv(query.get('query') || '');

  return (
    <Container>
      <Slider title="Movies" movieData={movieData} />
      <Slider title="TV Shows" tvData={tvData} />
      {(query.get('movie_id') || query.get('tv_id')) && <Detail />}
    </Container>
  );
};

export default Search;
