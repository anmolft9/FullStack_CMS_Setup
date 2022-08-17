import React from "react";
import { ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowMenu } from "../../pages/systemState/SystemSlice";

export const Sidemenu = () => {
  //

  const dispatch = useDispatch();
  const { showSideMenu } = useSelector((state) => state.system);

  const handleClose = () => dispatch(setShowMenu(false));
  //   const handleShow = () => setShow(true);

  return (
    <>
      <Offcanvas show={showSideMenu} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>CMS Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Link onClick={handleClose} to="" className="nav-link">
                <i class="fa-solid fa-gauge"></i> Dashboard
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="" className="nav-link">
                Category
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="" className="nav-link">
                products
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="" className="nav-link">
                payment methods
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="" className="nav-link">
                user
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="" className="nav-link">
                orders
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="" className="nav-link">
                reviews
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="" className="nav-link">
                setting
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
