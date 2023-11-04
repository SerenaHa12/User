import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../page/Home";
import Users from "../page/Users";
import Login from "../page/Login";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
      <PrivateRoutes path="/users">
        <Users />
      </PrivateRoutes>
    </>
  );
};

export default AppRoutes;
