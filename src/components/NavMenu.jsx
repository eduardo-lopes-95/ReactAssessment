import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavTitle = styled.h1`
  color: white;
  margin: 0;
  font-size: 1.5rem;
`;

function NavMenu() {
  return (
    <Nav>
      <NavTitle>Meu App</NavTitle>
    </Nav>
  );
}

export default NavMenu;
