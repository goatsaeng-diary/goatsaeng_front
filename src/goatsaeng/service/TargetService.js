import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

// target 생성
export function createTarget(targetRequest) {
  return request({
    url: API_BASE_URL + "/api/record/target",
    method: "POST",
    body: JSON.stringify(targetRequest),
  });
}

// target 수정
export function updatearget(targetRequest, targetId) {
  return request({
    url: API_BASE_URL + "/api/record/target/" + targetId,
    method: "PUT",
    body: JSON.stringify(targetRequest),
  });
}

// target 단일 조회 - default
export function showTarget(recordTypeId) {
  return request({
    url: API_BASE_URL + "/api/record/target/default/" + recordTypeId,
    method: "GET",
  });
}

// target 단일 조회 - custom
export function showCustomTarget(customRecordTypeId) {
  return request({
    url: API_BASE_URL + "/api/record/target/custom/" + customRecordTypeId,
    method: "GET",
  });
}

// target 전체 조회 - default
export function showAllTarget(recordTypeId) {
  return request({
    url: API_BASE_URL + "/api/record/allDefault/default/" + recordTypeId,
    method: "GET",
  });
}

// target 전체 조회 - custom
export function showAllCustomTarget(customRecordTypeId) {
  return request({
    url: API_BASE_URL + "/api/record/target/allCustom/" + customRecordTypeId,
    method: "GET",
  });
}

class TargetService {}
export default new TargetService();
