import { apiGet, apiPost } from "./client";

// 일기 목록 가져오기
export function getDiaries() {
  return apiGet("/diaries");
}

// 일기 작성
export function createDiary(data: {
  date: string;
  emotion: string;
  title: string;
  content: string;
}) {
  return apiPost("/diaries", data);
}
