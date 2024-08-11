import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constant/backendAPI";
import { checkIfLoggedIn } from "../../service/AuthService";

import styles from "./Fragment.module.css";
import logo from "../../../image/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 여부 확인하기
  useEffect(() => {
    const loggedIn = checkIfLoggedIn();
    setIsLoggedIn(loggedIn);
  }, []);

  // 로그아웃 시, localStorage에서 accessToken 삭제
  const handleLogOut = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      setIsLoggedIn(false);
      localStorage.removeItem(ACCESS_TOKEN);
      window.alert("로그아웃 되었습니다.");
      navigate("/login");
    }
  };

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt='갓생일기' />
      <div className={styles.container}>
        <div className={styles.box}>
          <button onClick={() => navigate("/challenge")}>챌린지</button>
          <button onClick={() => navigate("/trace")}>기록하기</button>
          <button onClick={() => navigate("/study")}>학습하기</button>
        </div>
        <div className={styles.box}>
          <button onClick={() => navigate("/mypage")}>마이페이지</button>
          {isLoggedIn ? (
            <button onClick={handleLogOut}>로그아웃</button>
          ) : (
            <button onClick={() => navigate("/login")}>로그인</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
