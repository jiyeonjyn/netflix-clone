import { motion } from 'framer-motion';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './logo';
import SearchBox from './search_box';

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  padding: 0 50px;
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

const Header = () => {
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('/tv');

  return (
    <Container>
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
