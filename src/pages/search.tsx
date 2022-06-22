import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Detail from '../components/detail';
import Slider from '../components/slider';
import { useSearchMovie } from '../hooks/search/useSearchMovie';
import { useSearchTv } from '../hooks/search/useSearchTv';

const BASE_WIDTH = 900;

const Container = styled.section<{ windowWidth: number }>`
  overflow: hidden;
  padding-top: ${(props) =>
    props.windowWidth > BASE_WIDTH ? '100px' : '30px'};
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
    <Container windowWidth={window.innerWidth}>
      <Slider title="Movies" movieData={movieData} />
      <Slider title="TV Shows" tvData={tvData} />
      {(query.get('movie_id') || query.get('tv_id')) && <Detail />}
    </Container>
  );
};

export default Search;
