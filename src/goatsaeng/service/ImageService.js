import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function showImage(filename) {
  return request({
    url: `${API_BASE_URL}/display?filename=${filename}`,
    method: "GET",
  });
} //s3에서 이미지 가져오는 로직

class ImageService {}
export default new ImageService();
