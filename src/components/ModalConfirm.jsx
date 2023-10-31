import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useState } from "react";
import { deleteDeleteUser } from "../api/userApi";

import { toast } from "react-toastify";
const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } = props;

  const handleConfirmDeleteUser = async () => {
    let res = await deleteDeleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      toast.success("User deleted successfully");
      handleClose();
      handleDeleteUserFromModal(dataUserDelete)
    } else {
      toast.error("User deleted failed");
    }
    console.log(res);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure to delete user? <b>Email: {dataUserDelete.email}</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
