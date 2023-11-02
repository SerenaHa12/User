import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

import { useLocation, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
// import { NavLink } from "react-rou";

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, user } = useContext(UserContext);
  const [hideHeader, setHideHeader] = useState(false);
  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // });

  const handleLogout = () => {
    logout();
    toast.success("Logout Success");
    navigate("/login");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">User Appication</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {(user && !user.auth ||
              window.location.pathname === '/') && (
                <>
                  <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                  </Nav>
                  <Nav>
                    {user && user.email && (
                      <span className="nav-link">Welcome {user.email}</span>
                    )}
                    {user && user.auth === true ? (
                      <Nav.Link href="#memes" onClick={handleLogout}>
                        Logout
                      </Nav.Link>
                    ) : (
                      <Nav.Link href="/login">Login</Nav.Link>
                    )}
                  </Nav>
                </>
              )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
