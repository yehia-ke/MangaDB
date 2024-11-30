import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import { useSession } from "../../context/SessionContext";

const Navbar = () => {
  const { user, logout } = useSession();

  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" activeStyle>
              Admin
            </NavLink>
          )}
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
              <span style={{ color: "#fff", marginRight: "20px" }}>
                Welcome, {user.mobileNumber}!
              </span>
              <button
                onClick={logout}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  background: "#15cdfc",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "0.3s ease-in-out",
                }}
              >
                Logout
              </button>
            </>
          )}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
