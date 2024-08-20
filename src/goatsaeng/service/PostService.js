import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function showListFollow() {
  return request({
    url: API_BASE_URL + "/api/post/list",
    method: "GET",
  });
} //전체 글 목록 가져오기 - follow

export function showListRecommend() {
  return request({
    url: API_BASE_URL + "/api/post/list",
    method: "GET",
  });
} //전체 글 목록 가져오기 - recommend

export function showPost(postId) {
  return request({
    url: API_BASE_URL + "/api/post/view/" + postId,
    method: "GET",
  });
} //단일 페이지 보기

export function showImage(fileName) {
  return request({
    url:
      API_BASE_URL +
      "/Users/jeong-yujin/Desktop/Yujin/project/갓생일기/upload/" +
      fileName,
    method: "GET",
  });
} //전체 글 목록 가져오기 - recommend

export function createPost(postCreateRequest) {
  return request({
    url: API_BASE_URL + "/api/post/create",
    method: "POST",
    body: JSON.stringify(postCreateRequest),
  });
} //글 작성하기

export function updatePost(postUpdateRequest, postId) {
  return request({
    url: API_BASE_URL + "/api/post/edit" + postId,
    method: "POST",
    body: JSON.stringify(postUpdateRequest),
  });
} //글 수정하기

export function deletePost(postId) {
  return request({
    url: API_BASE_URL + "/api/post/delete/" + postId,
    method: "DELETE",
  });
} //글 수정하기

class PostService {}
export default new PostService();
