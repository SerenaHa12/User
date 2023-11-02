import { useEffect, useState } from "react";
import _, { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import Container from "react-bootstrap/Container";

import { fetchAllUser } from "../api/userApi";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import checkToken from "../api/checkToken";

import { toast } from "react-toastify";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  checkToken();

  const navigate = useNavigate();
  const getUser = async (page) => {
    let res = await fetchAllUser(page);
    // console.log(res);

    if (res && res.data) {
      // console.log(1);

      setTotalUsers(res.total);
      setListUsers(res.data);
      // console.log("check", res.data);
      // console.log("listUsers updated:", listUsers);
      setTotalPages(res.total_pages);
    }
  };

  // phân trang
  const handlePageClick = (event) => {
    // console.log("event", event);
    getUser(+event.selected + 1);
  };

  useEffect(() => {
    getUser();
    // checkToken()
  }, []);
  // get list of users

  // add user
  const [isShowModalAddUser, setIsShowModalAddUser] = useState(false);
  const handleClose = () => {
    setIsShowModalAddUser(false);
    setIsShowModalEditUser(false);
    setIsShowModalDeleteUser(false);
  };
  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  // edit user
  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const handleEditUser = (user) => {
    // console.log(user);
    setDataUserEdit(user);
    setIsShowModalEditUser(true);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = [...listUsers];
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
    // console.log("check index", index);
    // console.log(listUsers, cloneListUsers);
    // console.log(user);
  };

  // delete users
  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const handleDeleteUser = (user) => {
    setIsShowModalDeleteUser(true);
    setDataUserDelete(user);
    console.log(user);
  };

  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = [...listUsers];
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };

  // sort id, name
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = [...listUsers];
    // cloneListUsers = cloneListUsers.sort(
    //   (a, b) => -(a[sortField] - b[sortField])
    // );
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
    // console.log(cloneListUsers);
  };

  // console.log("check sort", sortBy, sortField);

  // search
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const handleSearch = debounce((event) => {
    let keyword = event.target.value;
    console.log(event.target.value, keyword);
    if (keyword) {
      let cloneListUsers = [...listUsers];
      cloneListUsers = cloneListUsers.filter((item) =>
        item.email.includes(keyword)
      );
      console.log(cloneListUsers);
      // cloneListUsers = _.includes(cloneListUsers, item => item.includes());
      setListUsers(cloneListUsers);
    } else {
      getUser(1);
    }
  }, 500);

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
      <div className="col-6 my-3">
        <input
          type="search"
          className="form-control"
          aria-label="Search"
          placeholder="Search user by email..."
          aria-describedby="inputGroup-sizing-sm"
          // value={searchKeyWord}
          onChange={(event) => {
            handleSearch(event);
          }}
        ></input>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <span className="me-2">ID</span>
              <i
                className="fa-solid fa-arrow-down-long"
                onClick={() => {
                  handleSort("desc", "id");
                }}
              ></i>
              <i
                className="fa-solid fa-arrow-up-long"
                onClick={() => {
                  handleSort("asc", "id");
                }}
              ></i>
            </th>
            <th>Email</th>
            <th>
              <span className="me-2">First Name</span>{" "}
              <i
                className="fa-solid fa-arrow-down-long"
                onClick={() => {
                  handleSort("desc", "first_name");
                }}
              ></i>
              <i
                className="fa-solid fa-arrow-up-long"
                onClick={() => {
                  handleSort("asc", "first_name");
                }}
              ></i>
            </th>
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
                    <Button
                      className="mx-3"
                      variant="warning"
                      onClick={() => {
                        handleEditUser(item);
                      }}
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        handleDeleteUser(item);
                      }}
                    >
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
      <ModalEditUser
        show={isShowModalEditUser}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
      <ModalConfirm
        show={isShowModalDeleteUser}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;

// const [isShowModalAddUser, setIsShowModalAddUser] = useState({
//   id: 4,
//   age: 5,
//   name: "cho",
// });

// setIsShowModalAddUser((prev) => {
//   return {
//     ...prev,
//     id: 5,
//   };
// });
