import { ACCESS_TOKEN, API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function getSideUserInfo() {
  return request({
    url: API_BASE_URL + "/api/profile/semi-user",
    method: "GET",
  });
} //sidebar에서 프로필 조회 - 프로필 이미지, 닉네임, 포인트 총 점, 뱃지 총 수

class MyPageService {}
export default new MyPageService();
