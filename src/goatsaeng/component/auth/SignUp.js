import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constant/backendAPI";
import { checkUsername, signUp } from "../../service/AuthService";

import styles from "./Auth.module.css";
import logo from "../../../image/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    username: "",
    password: "",
    email: "", //인증을 이메일로 할 지 핸드폰으로 할 지 모름
    birthDate: "",
    nickname: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //오류 메시지
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [usernameConfirmMessage, setUsernameConfirmMessage] = useState("");

  //유효성 검사
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isUsernameConfirm, setIsUsernameConfirm] = useState(false);

  const handleSignUpFormChange = (e) => {
    const changedField = e.target.name;
    setSignUpForm({
      ...signUpForm,
      [changedField]: e.target.value,
    });
  };

  const handlePasswordConfirmChange = (e) => {
    const passwordInput = e.target.value;
    setPasswordConfirm(e.target.value);
    if (signUpForm.password === passwordInput) {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }
  };

  const handleUsernameConfirmChange = (e) => {
    e.preventDefault();
    checkUsername(signUpForm.username)
      .then((response) => {
        setUsernameConfirmMessage(response.message);
        setIsUsernameConfirm(true);
      })
      .catch((e) => {
        console.log(e);
        setUsernameConfirmMessage(e.exception.errorMessage);
        setIsUsernameConfirm(false);
      });
  };

  const handleSignUpFormSubmit = (e) => {
    e.preventDefault();
    if (isPasswordConfirm && isUsernameConfirm) {
      signUp(signUpForm)
        .then((response) => {
          window.alert(response.message);
          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    } else {
      window.alert("인증이 필요합니다.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt='갓생일기'></img>
        <h2>회원가입</h2>
        <form className={styles.signUpForm} onSubmit={handleSignUpFormSubmit}>
          <label htmlFor='name'>휴대폰 인증</label>
          <input
            placeholder='홍길동'
            id='name'
            type='text'
            name='name'
            required
            value={signUpForm.name}
            onChange={handleSignUpFormChange}
          ></input>
          <input
            placeholder='2001.01.01'
            id='birthdate'
            type='text'
            name='birthdate'
            required
            value={signUpForm.birthDate}
            onChange={handleSignUpFormChange}
          ></input>
          <div className={styles.phoneBox}>
            <select
              id='carrier'
              name='carrier'
              className={styles.select}
              required
            >
              <option value='' disabled>
                통신사 선택
              </option>
              <option value='skt'>SKT</option>
              <option value='kt'>KT</option>
              <option value='lguplus'>LGU+</option>
              <option value='mvno'>알뜰폰</option>
            </select>
            <input
              placeholder='01012345678'
              id='phone'
              type='text'
              name='phone'
              required
            ></input>
          </div>
          <button className={styles.button}>인증번호 요청하기</button>
          <label htmlFor='vertifycode'>인증번호 입력</label>
          <input
            placeholder='인증번호 입력'
            id='vertifycode'
            type='text'
            name='vertifycode'
            required
          ></input>
          <div className={styles.vertify}>
            <p>남은 시간 3:00</p>
            <p>재전송</p>
          </div>
          <button className={styles.button}>인증하기</button>
          <label htmlFor='username'>아이디</label>
          <div className={styles.duplicate}>
            <input
              placeholder='아이디'
              id='username'
              type='text'
              name='username'
              required
              value={signUpForm.username}
              onChange={handleSignUpFormChange}
            ></input>
            <button
              className={styles.button}
              onClick={handleUsernameConfirmChange}
            >
              중복 확인
            </button>
          </div>
          {usernameConfirmMessage && (
            <p className={styles.message}>{usernameConfirmMessage}</p>
          )}
          <label htmlFor='password'>비밀번호</label>
          <input
            placeholder='비밀번호'
            id='password'
            type='password'
            name='password'
            required
            value={signUpForm.password}
            onChange={handleSignUpFormChange}
          ></input>
          <input
            placeholder='비밀번호 확인'
            id='passwordConfirm'
            type='text'
            name='passwordConfirm'
            required
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          ></input>
          {passwordConfirmMessage && (
            <p className={styles.message}>{passwordConfirmMessage}</p>
          )}
          <label htmlFor='email'>이메일</label>
          <div className={styles.duplicate}>
            <input
              placeholder='이메일'
              id='email'
              type='email'
              name='email'
              required
              value={signUpForm.email}
              onChange={handleSignUpFormChange}
            ></input>
            <button className={styles.button}>중복 확인</button>
          </div>
          <label htmlFor='nickname'>닉네임</label>
          <input
            placeholder='닉네임'
            id='nickname'
            type='text'
            name='nickname'
            required
            value={signUpForm.nickname}
            onChange={handleSignUpFormChange}
          ></input>
          <button className={styles.button}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
