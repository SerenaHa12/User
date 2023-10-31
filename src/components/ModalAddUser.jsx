import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useState } from "react";
import { postCreateUser } from "../api/userApi";

import { toast } from "react-toastify";
const ModalAddUser = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    // console.log(name, job);
    // console.log(res);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("User added successfully");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("User added failed");
    }
  };
  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="User Name"
              aria-label="UserName"
              aria-describedby="basic-addon1"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Job"
              aria-label="Job"
              aria-describedby="basic-addon1"
              value={job}
              onChange={(event) => setJob(event.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddUser;
