import { useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import ModalAddUser from "./components/ModalAddUser";

function App() {
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);

  const handleClose = () => {
    setIsShowModalAddUser(false);
  };
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 d-flex justify-content-between">
          List Users:
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsShowModalAddUser(true)}
          >
            <span>Add user</span>
          </Button>{" "}
        </div>
        <TableUsers />
      </Container>

      <ModalAddUser show={isShowModalAddUser} handleClose={handleClose} />
    </div>
  );
}

export default App;
