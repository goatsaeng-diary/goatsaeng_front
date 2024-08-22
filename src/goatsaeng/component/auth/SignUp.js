import React, { useState, useEffect } from "react";
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
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");

  // 오류 메시지
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [usernameConfirmMessage, setUsernameConfirmMessage] = useState("");
  const [emailConfirmMessage, setEmailConfirmMessage] = useState("");

  // 유효성 검사
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isUsernameConfirm, setIsUsernameConfirm] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);

  // 이메일 인증
  const [isEmailCodeSend, setIsEmailCodeSend] = useState(false);
  const [isEmailCodeConfirm, setIsEmailCodeConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [verificationCodeInput, setVerificationCodeInput] = useState("");
  const [verificationButtonText, setVerificationButtonText] =
    useState("인증 요청");

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && isEmailCodeSend) {
      setVerificationButtonText("인증 재요청");
      window.alert("인증 시간이 만료되었습니다. 다시 요청해주세요.");
    }
  }, [timeLeft, isEmailCodeSend]);

  //이메일 유효성 검사
  const onEmailChange = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailInput = e.target.value;
    setEmail(emailInput);
    setSignUpForm({ ...signUpForm, email: emailInput });

    if (!emailRegex.test(emailInput)) {
      setEmailConfirmMessage("유효하지 않은 이메일 형식입니다.");
      setIsEmailConfirm(false);
    } else {
      setIsEmailConfirm(true);
      setEmailConfirmMessage("");
    }
  };

  //회원가입 폼 입력시 handle
  const handleSignUpFormChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm({ ...signUpForm, [name]: value });
  };

  //이메일 입력시 handle 및 이메일 중복 확인 요청
  const handleEmailConfirmChange = (e) => {
    e.preventDefault();
    if (!isEmailConfirm) return;

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

  //이메일 코드 입력 handle 및 이메일 인증 코드 요청
  const handleRequestEmailCode = (e) => {
    e.preventDefault();
    if (!isEmailConfirm) return;

    setIsLoading(true);
    requestEmailCode(signUpForm.email)
      .then((response) => {
        window.alert(response.message);
        setEmailVerificationCode(response.data.code);
        setIsEmailCodeSend(true);
        setVerificationButtonText("인증 재요청");
        setTimeLeft(180); // 3분 = 180초
      })
      .catch((e) => {
        console.log(e);
        window.alert(e.exception.errorMessage);
        setIsEmailCodeSend(false);
        setIsLoading(false);
      });
  };

  //이메일 인증번호 요청
  const handleRequestCodeVerify = (e) => {
    e.preventDefault();
    requestEmailVerify(signUpForm.email, verificationCodeInput)
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

  //시간 설정하기 - 인증번호 입력 3분
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  //닉네임 중복 확인
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

  //비밀번호 입력 확인
  const handlePasswordConfirmChange = (e) => {
    const passwordInput = e.target.value;
    setPasswordConfirm(passwordInput);
    if (signUpForm.password === passwordInput) {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }
  };

  //회원가입폼
  const onClickSignUpFormSubmit = (e) => {
    e.preventDefault();
    if (
      isPasswordConfirm &&
      isUsernameConfirm &&
      isEmailConfirm &&
      isEmailCodeConfirm
    ) {
      signUp(signUpForm)
        .then((response) => {
          console.log(signUpForm);
          window.alert(response.message);

          navigate("/login");
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.exception.errorMessage);
        });
    } else {
      window.alert("모든 인증이 필요합니다.");
    }
  };

  // 생년월일 입력하기
  const handleBirthChange = (e) => {
    const birthInput = e.target.value.replace(/-/g, ""); // 기존에 입력된 '-'를 제거
    if (birthInput.includes(" ") || birthInput.length > 8) {
      e.preventDefault();
      return;
    }

    let formattedBirth = birthInput;
    if (birthInput.length >= 4) {
      formattedBirth = birthInput.slice(0, 4) + "-" + birthInput.slice(4);
    }
    if (birthInput.length >= 6) {
      formattedBirth = formattedBirth.slice(0, 7) + "-" + birthInput.slice(6);
    }

    setBirth(formattedBirth); // 생년월일 입력값 업데이트
    setSignUpForm({
      ...signUpForm,
      birthDate: formattedBirth, // signUpForm의 birthDate도 업데이트
    });
  };
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} alt='갓생일기' />
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
              value={email}
              onChange={onEmailChange}
              disabled={isEmailCodeSend}
            />
            <button
              className={styles.button}
              onClick={handleEmailConfirmChange}
              disabled={!isEmailConfirm || isEmailCodeSend}
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
            disabled={isEmailCodeConfirm || !isEmailConfirm}
          >
            인증번호 요청하기
          </button>
          {isEmailCodeSend && !isEmailCodeConfirm && (
            <>
              <label htmlFor='verificationCode'>인증번호 입력</label>
              <input
                placeholder='인증번호 입력'
                id='verificationCode'
                type='text'
                name='verificationCode'
                required
                value={verificationCodeInput}
                onChange={(e) => setVerificationCodeInput(e.target.value)}
              />
              <div className={styles.vertify}>
                {timeLeft > 0 && (
                  <span className={styles.timer}>{formatTime(timeLeft)}</span>
                )}
              </div>
              <button
                className={styles.button}
                onClick={handleRequestCodeVerify}
                disabled={isEmailCodeConfirm || timeLeft === 0}
              >
                인증하기
              </button>
            </>
          )}
          {isEmailCodeConfirm && (
            <p className={styles.message}>이메일 인증 완료되었습니다.</p>
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
            />
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
          />
          <input
            placeholder='비밀번호 확인'
            id='passwordConfirm'
            type='password'
            name='passwordConfirm'
            required
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
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
          />
          <label htmlFor='birthDate'>생년월일</label>
          <input
            placeholder='20010101'
            id='birthDate'
            type='text'
            name='birthDate'
            required
            value={birth}
            onChange={handleBirthChange}
            inputMode='numeric'
          />
          <label htmlFor='nickname'>닉네임</label>
          <input
            placeholder='닉네임'
            id='nickname'
            type='text'
            name='nickname'
            required
            value={signUpForm.nickname}
            onChange={handleSignUpFormChange}
          />
          <button className={styles.button}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
