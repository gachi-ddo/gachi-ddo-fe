// 서버 기본 통신 설정
// 로컬에 .env 파일 만들고 API_BASE_URL=http://your-api-url.com 설정 후 사용

import axios from 'axios';

const baseURL = import.meta.env.API_BASE_URL || 'http://localhost:5173';

const client = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default client;
