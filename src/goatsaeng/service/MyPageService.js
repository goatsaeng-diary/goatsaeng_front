import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function getSideUserInfo() {
  return request({
    url: API_BASE_URL + "/api/profile/semi-user",
    method: "GET",
  });
} //sidebar에서 프로필 조회 - 프로필 이미지, 닉네임, 포인트 총 점, 뱃지 총 수

export function getUserPostList(userId) {
  return request({
    url: API_BASE_URL + "/api/post/list/" + userId,
    method: "GET",
  });
} //mypage에서 사용자 전체 게시물 가져오기

export function getUserLikeList(userId) {
  return request({
    url: API_BASE_URL + "/api/post/recommend",
    method: "GET",
  });
} //mypage에서 사용자 전체 게시물 가져오기

class MyPageService {}
export default new MyPageService();
