import client from '../apis/axios.js';

// lat, lng 필수 / radiusKm, page, size는 선택
export const getNearbyFacilities = async ({
  lat,
  lng,
  radiusKm = 5,
  page = 0,
  size = 10,
}) => {
  if (lat == null || lng == null) {
    throw new Error('위도/경도가 없습니다.');
  }

  const params = {
    lat,
    lng,
    radiusKm,
    page,
    size,
  };

  const { data } = await client.get('/facilities/nearby', { params });

  return data;
};
