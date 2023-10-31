// import { useState } from "react";

import Container from "react-bootstrap/Container";

import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
// import TableUsers from "./components/TableUsers";
import Home from "./page/Home";
import Users from "./page/Users";
import Login from "./page/Login";

import { Route, Routes, Link } from "react-router-dom";
function App() {
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
