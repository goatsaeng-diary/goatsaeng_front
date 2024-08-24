import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudy } from "../../service/StudyService";
import styles from "./MyPage.module.css";
import UserProfile from "./UserProfile";

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <UserProfile />
    </div>
  );
};

export default MyPage;
