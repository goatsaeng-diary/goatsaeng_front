import React from "react";
import Header from "../Fragment/Header";
import SideBar from "../Fragment/SideBar";
import Footer from "../Fragment/Footer";

import styles from "./Layout.module.css";
import Option from "../Fragment/Option";

const SubLayout = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.container}>
        <div className={styles.subSideContent}>
          <SideBar />
        </div>
        <div className={styles.subContent}>{children}</div>
      </div>
      <Option />
      <Footer />
    </div>
  );
};

export default SubLayout;
