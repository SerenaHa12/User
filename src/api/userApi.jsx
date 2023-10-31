// import axios from "axios";
import axiosClient from "./axiosClient";

const fetchAllUser = (page) => {
  return axiosClient.get(`/api/users?page=${page}`);
};
// console.log(fetchAllUser);

const postCreateUser = (name, job) => {
  return axiosClient.post("/api/users", { name, job });
};
// console.log(postCreateUser);

const putUpdateUser = (id, name, job) => {
  // console.log(name, job);
  return axiosClient.put(`/api/users/${id}`, { name, job });
};
// console.log(putUpdateUser);

const deleteDeleteUser = (id) => {
  return axiosClient.delete(`/api/users/${id}`);
};

export { fetchAllUser, postCreateUser, putUpdateUser };
