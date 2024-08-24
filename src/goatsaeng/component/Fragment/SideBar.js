import React, { useEffect, useState } from "react";
import { getSideUserInfo } from "../../service/MyPageService";

import styles from "./Fragment.module.css";
import userImage from "../../../image/userImage.png";

const SideBar = () => {
  const [userProfile, setUserProfile] = useState({
    imageUrl: "",
    nickname: "",
    totalPoint: 0,
    badget: 0,
  });

  useEffect(() => {
    fetchUserProfile(); // 프로필 데이터 요청
  }, []);

  const fetchUserProfile = () => {
    getSideUserInfo()
      .then((response) => {
        setUserProfile(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  return (
    <div className={styles.sidebar}>
      <img src={userImage} alt='프로필 이미지' />
      <h4>{userProfile.nickname}</h4>
      <p className={styles.profilePoint}>포인트 : {userProfile.totalPoint}P</p>
    </div>
  );
};

export default SideBar;
