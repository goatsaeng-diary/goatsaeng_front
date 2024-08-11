import React from "react";
import Footer from "../Fragment/Footer";

const AuthLayout = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default AuthLayout;
