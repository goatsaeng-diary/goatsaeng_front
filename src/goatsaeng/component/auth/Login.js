import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constant/backendAPI";
import { logIn } from "../../service/AuthService";

import styles from "./Auth.module.css";
import logo from "../../../image/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleLoginFormChange = (e) => {
    const changedField = e.target.name;
    setLoginForm({
      ...loginForm,
      [changedField]: e.target.value,
    });
  };

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    logIn(loginForm)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        window.alert(response.message);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  const handleGoSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt='갓생일기'></img>
        <h2>로그인</h2>
        <form className={styles.form} onSubmit={handleLoginFormSubmit}>
          <input
            placeholder='아이디'
            type='text'
            name='username'
            required
            value={loginForm.username}
            onChange={handleLoginFormChange}
          ></input>
          <input
            placeholder='비밀번호'
            type='password'
            name='password'
            required
            value={loginForm.password}
            onChange={handleLoginFormChange}
          ></input>
          <button className={styles.button}>로그인</button>
        </form>
        <p className={styles.forgetAuth}>아이디/비밀번호 찾기</p>
        <hr></hr>
        <div className={styles.social}>
          <img alt='google'></img>
          <img alt='kakao'></img>
          <img alt='naver'></img>
        </div>
        <p className={styles.goSignUp}>
          계정이 없으신가요? <strong onClick={handleGoSignUp}>회원가입</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
