import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/header';
import Home from './pages/home';
import TV from './pages/tv';

const Container = styled.section`
  overflow-x: hidden;
`;

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/tv/*" element={<TV />} />
      </Routes>
    </Container>
  );
};

export default App;
