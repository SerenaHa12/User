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

export { fetchAllUser, postCreateUser };
