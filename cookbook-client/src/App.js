// IMPORTS USED:
/*
npm install framer-motion react-icons react-router-dom styled-components
npm install @splidejs/react-splide
npm install mongodb
*/

import Pages from "./pages/Pages";
import Category from "./components/Category";
import {BrowserRouter, Link} from 'react-router-dom';
import Search from "./components/Search"
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <GiKnifeFork/>
          <Logo to={'/'}>Testing</Logo>
        </Nav>
        <Nav>
          <AddButton to={'/addrecipe/'}>Create Recipe</AddButton>
          <AddButton to={'/login/'}>Login</AddButton>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
`;

const AddButton = styled(Link)`
  display: flex;
  text-decoration: none;
  font-size: 1.5rem;
  width: 12rem;
  height: 4rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  background: linear-gradient(35deg, #494949, #313131);
  color: white;
  cursor: pointer;
  &:hover {
    background: #e94057;
  }
`;

const Nav = styled.div`
  padding: 1rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;

export default App;
