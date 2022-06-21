import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/header';
import { useGenreMovie } from './hooks/genre/useGenreMovie';
import { useGenreTv } from './hooks/genre/useGenreTv';
import Home from './pages/home';
import Search from './pages/search';
import TV from './pages/tv';

const Container = styled.section`
  overflow-x: hidden;
`;

const App = () => {
  useGenreMovie();
  useGenreTv();

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/tv/*" element={<TV />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Container>
  );
};

export default App;
