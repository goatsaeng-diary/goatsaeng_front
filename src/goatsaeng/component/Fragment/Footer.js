import React from "react";
import styles from "./Fragment.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} 갓생일기. All rights reserved.</p>
      <p>Created by Team 나랑 갓생할래?</p>
    </footer>
  );
};

export default Footer;
