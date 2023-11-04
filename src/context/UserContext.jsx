import React from "react";
import { useContext, useState, createContext } from "react";
import { toast } from "react-toastify";

const UserContext = createContext({ email: "", auth: false });
const UserProvider = ({ children }) => {
  // User is the email of the "data" that gets stored in context
  const [user, setUser] = useState({ email: "", auth: false });

  // Login updates the user data with a email parameter
  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);

    toast.success(`Login Success: ${email}`);
  };

  // Logout updates the user data to default
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    setUser((user) => ({
      email: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
