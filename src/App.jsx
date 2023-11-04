// import { useState } from "react";

import Container from "react-bootstrap/Container";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";

import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log("check user", user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
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
