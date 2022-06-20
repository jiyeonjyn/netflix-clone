import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './logo';
import SearchBox from './search_box';

const Container = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  position: fixed;
  width: 100%;
  top: 0;
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
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
};

const Header = () => {
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tv');

  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();
  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.get());
      scrollY.get() > 76
        ? navAnimation.start('scroll')
        : navAnimation.start('top');
    });
  }, [scrollY, navAnimation]);

  return (
    <Container
      variants={containerVariants}
      animate={navAnimation}
      initial="top"
    >
      <NavBar>
        <Logo />
        <NavList>
          <NavItem>
            <Link to="/">Home</Link>
            {homeMatch && <Circle layoutId="nav-circle" />}
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
