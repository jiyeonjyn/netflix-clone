import styled from 'styled-components';
import Slider from '../components/slider';
import { useMovieNowPlaying } from '../hooks/movie/useMovieNowPlaying';
import { makeImagePath } from '../utils';

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Home = () => {
  const { data } = useMovieNowPlaying();

  return (
    <>
      <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || '')} />
      <Slider movieData={data} />
    </>
  );
};

export default Home;
