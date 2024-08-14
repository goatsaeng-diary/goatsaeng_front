import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkEmail,
  checkUsername,
  requestEmailCode,
  requestEmailVerify,
  signUp,
} from "../../service/AuthService";

import styles from "./Auth.module.css";
import logo from "../../../image/logo.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    birthDate: "",
    nickname: "",
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //오류 메시지
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [usernameConfirmMessage, setUsernameConfirmMessage] = useState("");
  const [emailConfirmMessage, setEmailConfirmMessage] = useState("");

  //유효성 검사
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isUsernameConfirm, setIsUsernameConfirm] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);

  //이메일 인증
  const [isEmailCodeSend, setIsEmailCodeSend] = useState(false);
  const [isEmailCodeConfirm, setIsEmailCodeConfirm] = useState(false);

  const handleSignUpFormChange = (e) => {
    const changedField = e.target.name;
    setSignUpForm({
      ...signUpForm,
      [changedField]: e.target.value,
    });
  };

  //이메일 중복 확인
  const handleEmailConfirmChange = (e) => {
    e.preventDefault();
    checkEmail(signUpForm.email)
      .then((response) => {
        setEmailConfirmMessage(response.message);
        setIsEmailConfirm(true);
      })
      .catch((e) => {
        console.log(e);
        setEmailConfirmMessage(e.exception.errorMessage);
        setIsEmailConfirm(false);
      });
  };

  //이메일 인증번호 요청하기
  const handleRequestEmailCode = (e) => {
    e.preventDefault();
    requestEmailCode(signUpForm.email)
      .then((response) => {
        window.alert(response.message);
        setIsEmailCodeSend(true);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
        setIsEmailCodeSend(false);
      });
  };

  //이메일 인증번호 확인 요청하기
  const handleRequestCodeVertify = (e) => {
    e.preventDefault();
    requestEmailVerify(signUpForm.email, "zbIFcL9b")
      .then((response) => {
        window.alert(response.message);
        setIsEmailCodeConfirm(true);
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
        setIsEmailCodeConfirm(false);
      });
  };

  //아이디 중복 확인
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

  //비밀번호 확인
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

  //회원가입 요청 보내기 -> 비밀번호 일치, 닉네임 중복 X, 이메일 중복 X, 이메일 인증 완료
  const onClickSignUpFormSubmit = (e) => {
    e.preventDefault();
    if (
      isPasswordConfirm &&
      isUsernameConfirm &&
      // isEmailConfirm &&
      isEmailCodeConfirm
    ) {
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
        <form className={styles.signUpForm} onSubmit={onClickSignUpFormSubmit}>
          <label htmlFor='email'>이메일 인증</label>
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
            <button
              className={styles.button}
              onClick={handleEmailConfirmChange}
            >
              중복 확인
            </button>
          </div>
          {emailConfirmMessage && (
            <p className={styles.message}>{emailConfirmMessage}</p>
          )}
          <button
            className={styles.button}
            onClick={handleRequestEmailCode}
            disabled={isEmailCodeConfirm}
          >
            인증번호 요청하기
          </button>
          {isEmailCodeSend && !isEmailCodeConfirm && (
            <>
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
              <button
                className={styles.button}
                onClick={handleRequestCodeVertify}
              >
                인증하기
              </button>
            </>
          )}
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
            type='password'
            name='passwordConfirm'
            required
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          ></input>
          {passwordConfirmMessage && (
            <p className={styles.message}>{passwordConfirmMessage}</p>
          )}
          <label htmlFor='name'>이름</label>
          <input
            placeholder='홍길동'
            id='name'
            type='text'
            name='name'
            required
            value={signUpForm.name}
            onChange={handleSignUpFormChange}
          ></input>
          <label htmlFor='birthDate'>생년월일</label>
          <input
            placeholder='2001-01-01'
            id='birthDate'
            type='text'
            name='birthDate'
            required
            value={signUpForm.birthDate}
            onChange={handleSignUpFormChange}
          ></input>
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
