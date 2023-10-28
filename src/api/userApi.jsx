// import axios from "axios";
import axiosClient from "./axiosClient";

const fetchAllUser = (page) => {
  return axiosClient.get(`/api/users?page=${page}`);
};
// console.log(fetchAllUser);

export { fetchAllUser };
