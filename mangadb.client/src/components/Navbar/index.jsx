import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import styled from "styled-components"; // Import styled-components for custom styling
import { useSession } from "../../context/SessionContext";
import { useLocation } from 'react-router-dom'; // Import to access the current location

// Styled component for the Logout button
const LogoutButton = styled.button`
  font-family: "Satoshi-Bold", sans-serif;
  font-size: 16px;
  color: #ffffe4;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 0%;
  cursor: pointer;
  &:hover {
    color: #8d8989;
  }
`;

const Navbar = () => {
    const { user, logout } = useSession();
    const location = useLocation(); // Get the current location from the router

    return (
        <Nav>
            <NavMenu>
                <NavLink to="/" activeStyle>
                    Home
                </NavLink>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
                <NavLink to="/test" activeStyle>
                    Test
                </NavLink>

                {/* Conditionally render the Admin link if the user is an admin */}
                {user?.role === "admin" && (
                    <NavLink
                        to="/admin"
                        activeClassName="active"
                        className={location.pathname === '/admin2' ? 'active' : ''}
                    >
                        Admin
                    </NavLink>
                )}

                {/* Conditionally render login/signup or logout based on user session */}
                {!user ? (
                    <>
                        <NavLink to="/login" activeStyle>
                            Login
                        </NavLink>
                        <NavLink to="/signup" activeStyle>
                            Sign Up
                        </NavLink>
                    </>
                ) : (
                    <>
                        <LogoutButton onClick={logout}>Logout</LogoutButton>
                    </>
                )}
            </NavMenu>
        </Nav>
    );
};

export default Navbar;
