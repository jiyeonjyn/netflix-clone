import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useOnResize } from '../hooks/useOnResize';
import { ListResponse, Movie, TV } from '../types';
import { makeImagePath } from '../utils';

const BASE_WIDTH = [1400, 900];

const Container = styled.section``;

const Title = styled.h2`
  color: ${(props) => props.theme.white[0]};
  font-size: 20px;
  font-weight: 600;
  padding: 15px 40px;
`;

const Contents = styled.div`
  position: relative;
  height: 200px;
`;

const LeftArrow = styled.span`
  font-size: 30px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
`;

const RightArrow = styled(LeftArrow)`
  left: auto;
  right: 10px;
`;

const Row = styled(motion.div)<{ offset: number }>`
  padding: 0 40px;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 200px;
  min-height: 200px;
  max-height: 200px;
  object-fit: cover;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black[2]};
  opacity: 0;
  h4 {
    font-size: 18px;
    padding: 0 10px;
  }
`;

const rowVariants = {
  hidden: (isToBack: boolean) => ({
    x: isToBack ? -window.innerWidth + 80 : window.innerWidth - 80,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: (isToBack: boolean) => ({
    x: isToBack ? window.innerWidth - 80 : -window.innerWidth + 80,
    opacity: 0,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
    height: '200px',
  },
  hover: {
    scale: 1.3,
    y: -50,
    height: 'auto',
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

interface Props {
  movieData?: ListResponse<Movie>;
  tvData?: ListResponse<TV>;
  title: string;
}

const Slider = ({ movieData, tvData, title }: Props) => {
  const navigate = useNavigate();
  const searchMatch = useMatch('/search');
  const { search } = useLocation();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isToBack, setIsToBack] = useState(false);
  const windowWidth = window.innerWidth;
  const [offset, setOffset] = useState(
    windowWidth > BASE_WIDTH[0] ? 6 : windowWidth > BASE_WIDTH[1] ? 4 : 2
  );

  useOnResize((changed: number) => setOffset(changed));

  const decreaseIndex = () => {
    const data = movieData || tvData;
    if (!data || leaving) return;
    setIsToBack(true);
    setLeaving(true);
    const totalMovies = data.results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset);
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  const increaseIndex = () => {
    const data = movieData || tvData;
    if (!data || leaving) return;
    setIsToBack(false);
    setLeaving(true);
    const totalMovies = data.results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset);
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Contents>
        <LeftArrow onClick={decreaseIndex}>
          <i className="fa-solid fa-chevron-left"></i>
        </LeftArrow>
        <RightArrow onClick={increaseIndex}>
          <i className="fa-solid fa-chevron-right"></i>
        </RightArrow>
        <AnimatePresence
          initial={false}
          custom={isToBack}
          onExitComplete={() => setLeaving(false)}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 0.5 }}
            key={index}
            custom={isToBack}
            offset={offset}
          >
            {movieData?.results
              .slice(title === 'Latest movies' ? 1 : 0)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={`${title}-${movie.id}`}
                  key={`${title}-${movie.id}`}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() =>
                    navigate(
                      searchMatch
                        ? `/search${search}&movie_id=${movie.id}`
                        : `movie/${movie.id}`,
                      {
                        state: {
                          title: movie.title,
                          overview: movie.overview,
                          imagePath: movie.backdrop_path,
                          genre: movie.genre_ids,
                        },
                      }
                    )
                  }
                  transition={{ type: 'tween' }}
                >
                  <Img
                    src={makeImagePath(movie.backdrop_path, 'w500')}
                    alt={movie.title}
                  />
                  <Info variants={infoVariants}>
                    <h4>
                      {movie.title}
                      {movie.release_date &&
                        `(${movie.release_date.slice(0, 4)})`}
                    </h4>
                  </Info>
                </Box>
              ))}
            {tvData?.results
              .slice(title === 'Latest Shows' ? 1 : 0)
              .slice(offset * index, offset * index + offset)
              .map((tv) => (
                <Box
                  layoutId={`${title}-${tv.id}`}
                  key={`${title}-${tv.id}`}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  onClick={() =>
                    navigate(
                      searchMatch
                        ? `/search${search}&tv_id=${tv.id}`
                        : `${tv.id}`,
                      {
                        state: {
                          title: tv.name,
                          overview: tv.overview,
                          imagePath: tv.backdrop_path,
                          genre: tv.genre_ids,
                        },
                      }
                    )
                  }
                  transition={{ type: 'tween' }}
                >
                  <Img
                    src={makeImagePath(tv.backdrop_path, 'w500')}
                    alt={tv.name}
                  />
                  <Info variants={infoVariants}>
                    <h4>
                      {tv.name}
                      {tv.first_air_date &&
                        `(${tv.first_air_date.slice(0, 4)})`}
                    </h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Contents>
    </Container>
  );
};

export default Slider;
