import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function getStudy() {
  return request({
    url: API_BASE_URL + "/api/study/get",
    method: "GET",
  });
}

class StudyService {}
export default new StudyService();
