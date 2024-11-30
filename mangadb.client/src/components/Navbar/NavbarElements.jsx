// Filename - ./components/Navbar.js
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";


export const Nav = styled.nav`
  background: #4d4949;
  box-shadow: 0 0 4cap #ffffe4;
  align-self: center;
  border-radius: 10px;
  border-color: #ffffe4;
  padding: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const NavLink = styled(Link)`
  font-family: 'Satoshi-Bold';
  color: #ffffe4;
  display: flex;
  align-self: center;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #8d8989;
  }
  &.active {
    color: #000000;
    font-weight: 700;
    font-family: 'Satoshi-BoldItalic';
  }
`;

/*export const Bars = styled(FaBars)`
  display: flex;
  color: #000000;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;*/

export const NavMenu = styled.div`
  display: flex;
  align-content: center;
  }
`;
