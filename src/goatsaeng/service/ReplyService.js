import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

export function createReplyComment(commentId, replyRequest) {
  return request({
    url: API_BASE_URL + "/api/reply/create/" + commentId,
    method: "POST",
    body: JSON.stringify(replyRequest),
  });
} //댓글 등록하기

export function deleteReplyComment(replyId) {
  return request({
    url: API_BASE_URL + "/api/reply/delete/" + replyId,
    method: "DELETE",
  });
} //댓글 삭제하기

export function updateReplyComment(replyId, commentRequest) {
  return request({
    url: API_BASE_URL + "/api/reply/update/" + replyId,
    method: "POST",
    body: JSON.stringify(commentRequest),
  });
} //댓글 수정하기

export function showReplyComment(commentId) {
  return request({
    url: API_BASE_URL + "/api/reply/show/" + commentId,
    method: "GET",
  });
} //댓글 가져오기

class ReplyComment {}
export default new ReplyComment();
