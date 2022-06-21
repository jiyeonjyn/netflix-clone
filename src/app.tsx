import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import { useGenreMovie } from './hooks/genre/useGenreMovie';
import { useGenreTv } from './hooks/genre/useGenreTv';
import Home from './pages/home';
import Search from './pages/search';
import TV from './pages/tv';

const App = () => {
  useGenreMovie();
  useGenreTv();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/tv/*" element={<TV />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
};

export default App;
