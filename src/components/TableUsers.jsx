import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import Container from "react-bootstrap/Container";

import { fetchAllUser } from "../api/userApi";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    console.log(res);

    if (res && res.data) {
      // console.log(1);

      setTotalUsers(res.total);
      setListUsers(res.data);
      // console.log("check", res.data);
      // console.log("listUsers updated:", listUsers);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    console.log("event", event);
    getUser(+event.selected + 1);
  };

  // add user
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);
  const handleClose = () => {
    setIsShowModalAddUser(false);
  };
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);

  return (
    <>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <Button className="mx-3" variant="warning" size="sm">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Container className="mx-auto">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </Container>
      <ModalAddUser
        show={isShowModalAddUser}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser show={isShowModalEditUser} />
    </>
  );
};

export default TableUsers;
