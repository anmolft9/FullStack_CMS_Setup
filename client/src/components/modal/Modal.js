import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setModalShow } from "../../pages/systemState/SystemSlice";

export const CustomModal = ({ title, children }) => {
  const dispatch = useDispatch();
  const { modalShow } = useSelector((state) => state.system);
  return (
    <Modal
      show={modalShow}
      onHide={() => dispatch(setModalShow(false))}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(setModalShow())}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

function App() {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <CustomModal
        show={modalShow}
        onHide={() => dispatch(setModalShow(false))}
      />
    </>
  );
}
