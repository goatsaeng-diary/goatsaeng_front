import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "../constant/backendAPI";
import { request } from "../service/APIService";

export function uploadFile(files) {
  if (!files || files.length === 0) {
    return Promise.reject(new Error("No files to upload"));
  }

  const formData = new FormData();

  files.forEach((file) => {
    formData.append(`files`, file);
  });

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      "Content-Type": "multipart/form-data",
    },
  };

  return axios
    .post(`${API_BASE_URL}/api/doc/upload`, formData, config)
    .then((response) => {
      console.log("파일 업로드 성공", response);
      return response.data;
    })
    .catch((error) => {
      console.error("파일 업로드 실패", error);
      throw error;
    });
}

export function getList() {
  return request({
    url: API_BASE_URL + "/api/doc/list",
    method: "GET",
  });
}

export function searchContent(content) {
  return request({
    url: API_BASE_URL + "/api/doc/chat?content=" + content,
    method: "GET",
  });
}

class FileService {}
export default new FileService();
