import client from '@/api/client';

export const getClubList = async ({
  page = 0,
  size = 10,
  ctprvn,
  signgu,
  item,
  disabled,
  genderType,
  ageGroup,
}) => {
  try {
    const queryParams = new URLSearchParams();

    queryParams.append('page', page);
    queryParams.append('size', size);

    if (ctprvn) queryParams.append('ctprvn', ctprvn);
    if (signgu) queryParams.append('signgu', signgu);
    if (item) queryParams.append('item', item);

    if (disabled !== null && disabled !== undefined) {
      queryParams.append('disabled', disabled);
    }

    if (genderType) queryParams.append('genderType', genderType);
    if (ageGroup) queryParams.append('ageGroup', ageGroup);

    const { data } = await client.get(`/clubs?${queryParams.toString()}`);
    return data;
  } catch (error) {
    console.error('동호회 목록 조회 실패:', error);
    throw error;
  }
};
