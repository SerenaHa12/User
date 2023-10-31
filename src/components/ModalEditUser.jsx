import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import { putUpdateUser } from "../api/userApi";

import { toast } from "react-toastify";
import _ from "lodash";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const { id, first_name } = dataUserEdit;

  const handleEditUser = async () => {
    // console.log(user);
    let res = await putUpdateUser(id, name, job);
    // console.log(res);
    if (res && res.updatedAt) {
      handleClose();
      setJob("");
      toast.success("User edited successfully");
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      // handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("User edited failed");
    }
  };

  // console.log('check props', dataUserEdit);

  // sử dụng hook để lấy ra giá trị first_name
  useEffect(() => {
    if (show) {
      setName(first_name);
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
          <Button variant="primary" onClick={handleEditUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
