import React from "react";
import Header from "../Fragment/Header";
import SideBar from "../Fragment/SideBar";
import Lanking from "../Fragment/Lanking";
import Footer from "../Fragment/Footer";

import styles from "./Layout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.mainSideContent}>
          <SideBar />
          <Lanking />
        </div>
        <div className={styles.mainContent}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
