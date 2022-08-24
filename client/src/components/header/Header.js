import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogout } from "../../pages/login/userAction.js";
import { setShowMenu } from "../../pages/systemState/SystemSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.admin);

  const handleShow = () => {
    dispatch(setShowMenu(true));
  };

  const handleOnLogout = () => {
    dispatch(adminLogout());
    navigate("/");
  };
  return (
    <Navbar collapseOnSelect bg="light" variant="light" expand="md">
      <Container>
        <div>
          {user._id && (
            <i className="fa-solid fa-bars" onClick={handleShow}></i>
          )}

          {""}

          <Navbar.Brand href="/">March</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user._id ? (
              <Link className="nav-link" to="/" onClick={handleOnLogout}>
                logout
              </Link>
            ) : (
              <Link className="nav-link" to="/register">
                login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
