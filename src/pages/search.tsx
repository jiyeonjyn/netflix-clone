import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Slider from '../components/slider';
import { useSearchMovie } from '../hooks/search/useSearchMovie';
import { useSearchTv } from '../hooks/search/useSearchTv';

const Container = styled.section`
  padding-top: 100px;
  section {
    margin-bottom: 30px;
  }
`;

const Search = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const { data: movieData } = useSearchMovie(query.get('query') || '');
  const { data: tvData } = useSearchTv(query.get('query') || '');

  return (
    <Container>
      <Slider title="Movies" movieData={movieData} />
      <Slider title="TV Shows" tvData={tvData} />
    </Container>
  );
};

export default Search;
