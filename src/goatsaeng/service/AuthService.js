import { ACCESS_TOKEN, API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function logIn(loginRequest) {
  return request({
    url: API_BASE_URL + "/api/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
} //로그인 요청

export function signUp(signUpRequest) {
  return request({
    url: API_BASE_URL + "/api/auth/sign-up",
    method: "POST",
    body: JSON.stringify(signUpRequest),
  });
} //회원가입 요청

export function logOut() {
  return request({
    url: API_BASE_URL + "/api/auth/logout",
    method: "POST",
  });
} //로그아웃 요청

export function withdraw() {
  return request({
    url: API_BASE_URL + "/api/auth/withdraw",
    method: "DELETE",
  });
} //회원 탈퇴 요청

export function checkUsername(username) {
  return request({
    url: API_BASE_URL + "/api/auth/check-username/" + username,
    method: "GET",
  });
} //username 중복 확인

export function checkEmail(email) {
  return request({
    url: API_BASE_URL + "/api/auth/check-email/" + email,
    method: "GET",
  });
} //email 중복 확인

export function requestEmailCode(email) {
  return request({
    url: API_BASE_URL + "/api/auth/email-send/" + email,
    method: "POST",
  });
} //이메일 인증 요청

export function requestEmailVerify(email, code) {
  return request({
    url: API_BASE_URL + "/api/auth/email-verify/" + email + "/" + code,
    method: "GET",
  });
} //이메일 인증 확인 요청

export function getUserProfile() {
  return request({
    url: API_BASE_URL + "/api/auth/info",
    method: "GET",
  });
} //본인 정보 요청

export function checkIfLoggedIn() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    // window.alert("로그인이 필요한 서비스입니다.");
    return false;
  }
  return true;
} //로그인 여부 확인 - 토큰

class AuthService {}
export default new AuthService();
