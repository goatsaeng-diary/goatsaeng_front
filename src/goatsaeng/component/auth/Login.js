import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constant/backendAPI";
import { logIn, socialLogin } from "../../service/AuthService";

import styles from "./Auth.module.css";
import logo from "../../../image/logo.png";
import kakao from "../../../image/kakao.png";
import naver from "../../../image/naver.png";
import google from "../../../image/google.png";

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

  const onClickLoginFormSubmit = (e) => {
    e.preventDefault();
    logIn(loginForm)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        window.alert(response.message);
        console.log(response);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
      });
  };

  const onClickGoSignUp = () => {
    navigate("/signup");
  };

  const onClickSocialLogin = (provider) => {
    socialLogin(provider);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt='갓생일기'></img>
        <h2>로그인</h2>
        <form className={styles.form} onSubmit={onClickLoginFormSubmit}>
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
          <img
            src={kakao}
            alt='kakao'
            onClick={() => onClickSocialLogin("kakao")}
            style={{ cursor: "pointer" }}
          />
          <img
            src={naver}
            alt='naver'
            onClick={() => onClickSocialLogin("naver")}
            style={{ cursor: "pointer" }}
          />
          <img
            src={google}
            alt='google'
            onClick={() => onClickSocialLogin("google")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <p className={styles.goSignUp}>
          계정이 없으신가요? <strong onClick={onClickGoSignUp}>회원가입</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
