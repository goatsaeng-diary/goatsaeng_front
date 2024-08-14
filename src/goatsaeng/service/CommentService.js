import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function createComment(postId, commentRequest) {
  return request({
    url: API_BASE_URL + "/api/comment/create/" + postId,
    method: "POST",
    body: JSON.stringify(commentRequest),
  });
} //댓글 등록하기

export function deleteComment(commentId) {
  return request({
    url: API_BASE_URL + "/api/comment/delete/" + commentId,
    method: "DELETE",
  });
} //댓글 삭제하기

export function updateComment(commentId, commentRequest) {
  return request({
    url: API_BASE_URL + "/api/comment/update/" + commentId,
    method: "POST",
    body: JSON.stringify(commentRequest),
  });
} //댓글 수정하기

export function showComment(postId) {
  return request({
    url: API_BASE_URL + "/api/comment/show/" + postId,
    method: "GET",
  });
} //댓글 가져오기

class CommentService {}
export default new CommentService();
