import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStudy } from "../../service/StudyService";
import styles from "./MyPage.module.css";

const UserProfile = () => {
  const navigate = useNavigate();

  return <div className={styles.container}></div>;
};

export default UserProfile;
