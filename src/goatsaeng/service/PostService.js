import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function showListFollow() {
  return request({
    url: API_BASE_URL + "/api/post/list/follow",
    method: "GET",
  });
} //전체 글 목록 가져오기 - follow

export function showListRecommend() {
  return request({
    url: API_BASE_URL + "/api/post/list/recommend",
    method: "GET",
  });
} //전체 글 목록 가져오기 - recommend

export function showPost(postId) {
  return request({
    url: API_BASE_URL + "/api/post/view/" + postId,
    method: "GET",
  });
} //단일 페이지 보기

export function createPost(postCreateRequest) {
  return request({
    url: API_BASE_URL + "/api/post/create",
    method: "POST",
    body: JSON.stringify(postCreateRequest),
  });
} //글 작성하기

export function updatePost(postUpdateRequest) {
  return request({
    url: API_BASE_URL + "/api/post/update",
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
