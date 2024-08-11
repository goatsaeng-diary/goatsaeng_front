import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../service/AuthService";

import styles from "./Fragment.module.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    nickname: "",
    username: "",
    totalPoint: 0,
    badget: 0,
  });

  // useEffect(() => {
  //   fetchUserProfile(); // 프로필 데이터 요청
  // }, []);

  const fetchUserProfile = () => {
    getUserProfile()
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  return (
    <div className={styles.sidebar}>
      <img src='https://via.placeholder.com/216' alt='프로필 이미지' />
      <h4> 닉네임{userProfile.nickname}</h4>
      <p className={styles.profileUsername}>아이디 {userProfile.username} </p>
      <p className={styles.profilePoint}>포인트 : {userProfile.totalPoint}P</p>
      <p className={styles.profileBadget}>
        획득한 뱃지 수 : {userProfile.badget}개
      </p>
    </div>
  );
};

export default SideBar;
