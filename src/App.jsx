import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ModalAddUser from "./components/ModalAddUser";

function App() {


  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 d-flex justify-content-between">
          List Users:
          <Button variant="primary" size="sm">
            <span>add user</span>
          </Button>{" "}
        </div>
        <TableUsers />
      </Container>

      <ModalAddUser />
    </div>
  );
}

export default App;
