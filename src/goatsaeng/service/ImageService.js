import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

import axios from "axios";
export const showImage = (filename) => {
  return axios.get(`http://localhost:8080/display?filename=${filename}`, {
    responseType: "blob", // 응답 타입을 'blob'으로 설정
    withCredentials: true, // CORS 관련 설정 (필요한 경우)
  });
};
class ImageService {}
export default new ImageService();
