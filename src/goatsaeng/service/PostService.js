import axios from "axios";
import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";
import { ACCESS_TOKEN } from "../constant/backendAPI";

export function showListFollow() {
  return request({
    url: API_BASE_URL + "/api/post/list",
    method: "GET",
  });
} //전체 글 목록 가져오기 - follow

export function showListRecommend() {
  return request({
    url: API_BASE_URL + "/api/post/recommend",
    method: "GET",
  });
} //전체 글 목록 가져오기 - recommend

export function showPost(postId) {
  return request({
    url: API_BASE_URL + "/api/post/view/" + postId,
    method: "GET",
  });
} //단일 페이지 보기

export function createPost(postData, files) {
  const formData = new FormData();

  // PostCreateDTO 데이터를 JSON 문자열로 변환하여 추가
  formData.append(
    "postCreateDTO",
    new Blob([JSON.stringify(postData)], {
      type: "application/json",
    })
  );

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
    .post(`${API_BASE_URL}/api/post/create`, formData, config)
    .then((response) => {
      console.log("게시물 작성 성공", response);
      return response.data;
    })
    .catch((error) => {
      console.error("게시물 작성 실패", error);
      throw error;
    });
} //글 등록하기

export function updatePost(postUpdateRequest, postId) {
  return request({
    url: API_BASE_URL + "/api/post/edit" + postId,
    method: "PUT",
    body: JSON.stringify(postUpdateRequest),
  });
} //글 수정하기

export function deletePost(postId) {
  return request({
    url: API_BASE_URL + "/api/post/delete/" + postId,
    method: "DELETE",
  });
} //글 삭제하기

export function createLike(likeRequest, postId) {
  return request({
    url: API_BASE_URL + "/api/post/like" + postId,
    method: "POST",
    body: JSON.stringify(likeRequest),
  });
} //글 수정하기

class PostService {}
export default new PostService();
