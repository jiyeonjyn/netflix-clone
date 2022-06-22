import { motion } from 'framer-motion';
import { useQueryClient } from 'react-query';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Genre } from '../types';
import { makeImagePath } from '../utils';

const BASE_WIDTH = 620;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 999;
`;

const Container = styled.section<{ windowWidth: number }>`
  width: ${(props) => (props.windowWidth > BASE_WIDTH ? '40vw' : '90%')};
  min-width: ${(props) => (props.windowWidth > BASE_WIDTH ? '600px' : '0')};
  height: ${(props) => (props.windowWidth > BASE_WIDTH ? '85vh' : '75vh')};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black[1]};
  box-shadow: 0px 2px 4px rgba(48, 51, 107, 0.08);
  overflow-y: auto;
  padding-bottom: 20px;
`;

const ImgWrapper = styled.div`
  width: 100%;
  max-height: 50%;
  overflow: hidden;
  position: relative;
`;

const Img = styled.img<{ windowWidth: number }>`
  width: 100%;
  height: auto;
  min-height: ${(props) =>
    props.windowWidth > BASE_WIDTH ? '300px' : '180px'};
  object-fit: contain;
`;

const Blur = styled.div<{ windowWidth: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.windowWidth > BASE_WIDTH ? '300px' : '180px')};
  background-image: linear-gradient(
    rgba(0, 0, 0, 0),
    ${(props) => props.theme.black[1]}
  );
`;

const Title = styled.h3<{ windowWidth: number }>`
  padding: 0 ${(props) => (props.windowWidth > BASE_WIDTH ? '40px' : '20px')};
  font-size: ${(props) => (props.windowWidth > BASE_WIDTH ? '46px' : '30px')};
  position: relative;
  top: -50px;
`;

const Genres = styled.div<{ windowWidth: number }>`
  font-size: ${(props) => (props.windowWidth > BASE_WIDTH ? '16px' : '12px')};
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  span {
    margin-right: 10px;
    margin-top: 10px;
    background-color: ${(props) => props.theme.black[2]};
    padding: 4px 9px;
    border-radius: 20px;
    white-space: nowrap;
  }
`;

const Overview = styled.p<{ windowWidth: number }>`
  padding: 0 ${(props) => (props.windowWidth > BASE_WIDTH ? '40px' : '20px')};
  font-size: ${(props) => (props.windowWidth > BASE_WIDTH ? '20px' : '14px')};
`;

type State = {
  title: string;
  overview: string;
  imagePath: string;
  genre: number[];
};

const Detail = () => {
  const movieMatch = useMatch('/movie/*');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as State;
  const query = new URLSearchParams(location.search);

  const onOverlayClick = () =>
    navigate(
      query.get('movie_id') || query.get('tv_id')
        ? `/search?query=${query.get('query')}`
        : movieMatch
        ? '/'
        : '/tv'
    );

  const queryClient = useQueryClient();
  const movieGenre = queryClient.getQueryData<Genre[]>(['genre', 'movie']);
  const tvGenre = queryClient.getQueryData<Genre[]>(['genre', 'tv']);

  const windowWidth = window.innerWidth;

  return (
    <Overlay
      onClick={onOverlayClick}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Container windowWidth={windowWidth} onClick={(e) => e.stopPropagation()}>
        <ImgWrapper>
          <Img
            windowWidth={windowWidth}
            src={makeImagePath(state.imagePath)}
            alt=""
          />
          <Blur windowWidth={windowWidth} />
        </ImgWrapper>
        <Title windowWidth={windowWidth}>
          {state?.title}
          <Genres windowWidth={windowWidth}>
            {state.genre.map((id) => (
              <span key={`${id}`}>
                {movieMatch || query.get('movie_id')
                  ? movieGenre?.find((genre) => genre.id === id)?.name
                  : tvGenre?.find((genre) => genre.id === id)?.name}
              </span>
            ))}
          </Genres>
        </Title>
        <Overview windowWidth={windowWidth}>{state?.overview}</Overview>
      </Container>
    </Overlay>
  );
};

export default Detail;
