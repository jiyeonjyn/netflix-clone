import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Detail from '../components/detail';
import Slider from '../components/slider';
import { useTvAiringToday } from '../hooks/tv/useTvAiringToday';
import { useTvOnTheAir } from '../hooks/tv/useTvOnTheAir';
import { useTvPopular } from '../hooks/tv/useTvPolular';
import { useTvTopRated } from '../hooks/tv/useTvTopRated';
import { makeImagePath } from '../utils';

const Container = styled.section`
  min-height: 100vh;
  overflow: hidden;
`;

const Banner = styled.div`
  position: relative;
  min-height: 800px;
  max-height: 100vh;
`;

const Img = styled.img`
  min-height: 800px;
  width: 100vw;
  height: auto;
  object-fit: contain;
`;

const Blur = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0),
    ${(props) => props.theme.black[0]}
  );
`;

const Info = styled.div`
  position: absolute;
  top: 30%;
  left: 0;
  padding: 0 40px;
`;

const Title = styled.h2`
  font-size: 68px;
  font-weight: 600;
  margin-bottom: 26px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
  margin-bottom: 26px;
`;

const SeeMore = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 11px 28px 12px 23px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.35);
  font-weight: 600;
  cursor: pointer;
  span {
    margin-left: 15px;
    font-size: 22px;
  }
`;

const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
  section {
    margin-bottom: 30px;
  }
`;

const TV = () => {
  const navigate = useNavigate();

  const { data: onTheAirData, isLoading } = useTvOnTheAir();
  const { data: airingTodayData } = useTvAiringToday();
  const { data: popularData } = useTvPopular();
  const { data: topRatedData } = useTvTopRated();

  return (
    <Container>
      <Banner>
        {!isLoading && (
          <>
            <Img
              src={makeImagePath(onTheAirData?.results[0].backdrop_path || '')}
              alt=""
            />
            <Blur />
            <Info>
              <Title>{onTheAirData?.results[0].name}</Title>
              <Overview>{onTheAirData?.results[0].overview}</Overview>
              <SeeMore
                onClick={() =>
                  navigate(`${onTheAirData?.results[0].id}`, {
                    state: {
                      title: onTheAirData?.results[0].name,
                      overview: onTheAirData?.results[0].overview,
                      imagePath: onTheAirData?.results[0].backdrop_path,
                      genre: onTheAirData?.results[0].genre_ids,
                    },
                  })
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>More info</span>
              </SeeMore>
            </Info>
          </>
        )}
      </Banner>
      <SliderWrapper>
        <Slider title="Latest Shows" tvData={onTheAirData} />
        <Slider title="Airing Today" tvData={airingTodayData} />
        <Slider title="Popular" tvData={popularData} />
        <Slider title="Top Rated" tvData={topRatedData} />
      </SliderWrapper>
      <Routes>
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </Container>
  );
};

export default TV;
