import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import TV from './pages/tv';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/tv/*" element={<TV />} />
      </Routes>
    </>
  );
};

export default App;
