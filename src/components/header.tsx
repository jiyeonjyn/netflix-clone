import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './logo';
import SearchBox from './search_box';

const BASE_WIDTH = 900;

const Container = styled(motion.header)<{ windowwidth: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  position: ${(props) => (props.windowwidth > BASE_WIDTH ? 'fixed' : 'sticky')};
  width: 100%;
  top: 0;
  z-index: 10;
  box-shadow: 0px 2px 4px rgba(48, 51, 107, 0.08);
`;

const NavBar = styled.nav`
  display: flex;
`;

const NavList = styled.ul`
  display: flex;
`;

const NavItem = styled.li`
  margin-left: 18px;
  display: flex;
  align-items: center;
  position: relative;
  a {
    padding: 5px;
    transition: opacity 0.1s;
  }
  a:hover {
    opacity: 0.6;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const containerVariants = {
  top: () => ({
    backgroundColor:
      window.innerWidth > BASE_WIDTH
        ? 'rgba(18, 18, 18, 0)'
        : 'rgba(18, 18, 18, 1)',
  }),
  scroll: {
    backgroundColor: 'rgba(18, 18, 18, 1)',
  },
};

const Header = () => {
  const homeMatch = useMatch('/');
  const movieMatch = useMatch('/movie/*');
  const tvMatch = useMatch('/tv/*');

  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      scrollY.get() > 76
        ? navAnimation.start('scroll')
        : navAnimation.start('top');
    });
  }, [scrollY, navAnimation]);

  return (
    <Container
      windowwidth={window.innerWidth}
      variants={containerVariants}
      animate={navAnimation}
      initial="top"
    >
      <NavBar>
        <Logo />
        <NavList>
          <NavItem>
            <Link to="/">Home</Link>
            {(homeMatch || movieMatch) && <Circle layoutId="nav-circle" />}
          </NavItem>
          <NavItem>
            <Link to="/tv">TV Shows</Link>
            {tvMatch && <Circle layoutId="nav-circle" />}
          </NavItem>
        </NavList>
      </NavBar>
      <SearchBox />
    </Container>
  );
};

export default Header;
