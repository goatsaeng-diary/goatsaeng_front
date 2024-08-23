import { API_BASE_URL } from "../constant/backendAPI";
import { request } from "./APIService";

//custom 기록 type 관련
export function createCustomRecord(customRecordRequest) {
  return request({
    url: API_BASE_URL + "/api/record/custom-type",
    method: "POST",
    body: JSON.stringify(customRecordRequest),
  });
} //custom 기록 생성하기

export function updateCustomRecord(customRecordTypeId, customRecordRequest) {
  return request({
    url: API_BASE_URL + "/api/record/custom-type/" + customRecordTypeId,
    method: "PUT",
    body: JSON.stringify(customRecordRequest),
  });
} //custom 기록 수정하기

export function deleteCustomRecord(customRecordTypeId) {
  return request({
    url: API_BASE_URL + "/api/record/custom-type/" + customRecordTypeId,
    method: "DELETE",
  });
} //custom 기록 삭제하기

export function showCustomRecord(customRecordTypeId) {
  return request({
    url: API_BASE_URL + "/api/record/custom-type/" + customRecordTypeId,
    method: "GET",
  });
} //custom 기록 조회하기

export function showAllCustomRecordType() {
  return request({
    url: API_BASE_URL + "/api/record/custom-type",
    method: "GET",
  });
} //custom 기록 전체 조회하기 --user 본인이 만든거

//custom 기록 type 관련
export function createRecord(customRecordTypeId, recordRequest) {
  return request({
    url: API_BASE_URL + "/api/record/custom/" + customRecordTypeId,
    method: "POST",
    body: JSON.stringify(recordRequest),
  });
} //custom 기록 저장하기

export function updateRecord(customRecordId, recordRequest) {
  return request({
    url: API_BASE_URL + "/api/record/custom/" + customRecordId,
    method: "PUT",
    body: JSON.stringify(recordRequest),
  });
} //custom 기록 수정하기

export function deleteRecord(customRecordId) {
  return request({
    url: API_BASE_URL + "/api/record/custom/" + customRecordId,
    method: "DELETE",
  });
} //custom 기록 삭제하기

export function showRecord(customRecordId) {
  return request({
    url: API_BASE_URL + "/api/record/custom/" + customRecordId,
    method: "GET",
  });
} //custom 기록 단일 조회

export function showTodayRecord() {
  return request({
    url: API_BASE_URL + "/api/record/custom/today",
    method: "GET",
  });
} //custom 기록 단일 조회

export function showRecordMonth(page = 0, size = 5) {
  return request({
    url:
      API_BASE_URL +
      "/api/record/default/current-month" +
      `?page=${page}&size=${size}`,
    method: "GET",
  });
} //custom 기록 당월 조회

export function showRecordAverage(page = 0, size = 5, customRecordTypeId) {
  return request({
    url:
      API_BASE_URL +
      "/api/record/default/prev-average-month/" +
      customRecordTypeId +
      `?page=${page}&size=${size}`,
    method: "GET",
  });
} //custom 기록 평균 및 전체 조회

class CustomRecordService {}
export default new CustomRecordService();
