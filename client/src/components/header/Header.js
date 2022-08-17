import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowMenu } from "../../pages/systemState/SystemSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.admin);

  const handleShow = () => {
    dispatch(setShowMenu(true));
  };
  return (
    <Navbar collapseOnSelect bg="info" variant="light" expand="md">
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
              <Link className="nav-link" to="/">
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
