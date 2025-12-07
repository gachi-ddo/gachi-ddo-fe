// src/api/club.js 같은 곳
import client from './axios.js';

export const getClubList = async ({
  page = 0,
  size = 10,
  name, // 검색어
  ctprvn,
  signgu,
  item, // 종목
  isDisabled, // Boolean
}) => {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append('page', page);
    queryParams.append('size', size);

    if (name) queryParams.append('name', name);
    if (ctprvn) queryParams.append('ctprvn', ctprvn);
    if (signgu) queryParams.append('signgu', signgu);
    if (item) queryParams.append('item', item);

    if (isDisabled !== null && isDisabled !== undefined) {
      queryParams.append('isDisabled', isDisabled); // ★ DTO 필드명 그대로
    }

    const { data } = await client.get(`/clubs?${queryParams.toString()}`);
    return data; // ClubListResponse
  } catch (error) {
    console.error('동호회 목록 조회 실패:', error);
    throw error;
  }
};

export const getClubDetail = async (clubId) => {
  try {
    const { data } = await client.get(`/clubs/${clubId}`);
    return data; // ClubDetailResponse
  } catch (error) {
    console.error('동호회 상세 조회 실패:', error);
    throw error;
  }
};
