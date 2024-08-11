import React, { createContext, useContext, useState, useEffect } from "react";
import { checkIfLoggedIn } from "../service/AuthService";
import { ACCESS_TOKEN } from "../constant/backendAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = checkIfLoggedIn();
    setIsLoggedIn(loggedIn);
    console.log("Logged in status inside useEffect:", loggedIn); // 여기에서 확인
    console.log(localStorage.getItem(ACCESS_TOKEN));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
