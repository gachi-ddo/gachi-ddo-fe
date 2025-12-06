import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Dumbbell,
  Search,
  MapPin,
  Phone,
  Globe,
  UsersIcon,
  Filter,
  Building2,
  Ruler, } from "lucide-react"

import Header from './Header';
import { getNearbyFacilities } from '../apis/facility';

const DEFAULT_CENTER = {
  lat: 37.5665,
  lng: 126.978, // 서울 시청 근처
};

const Facility = () => {

  // UI 상태 (검색/필터: 현재는 모양만)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // 위치 + 데이터 상태
  const [position, setPosition] = useState(null); // { lat, lng }
  const [useDefaultCenter, setUseDefaultCenter] = useState(false);

  const [facilities, setFacilities] = useState([]); // FacilityListDto[]
  const [markers, setMarkers] = useState([]); // FacilityMarkerDto[]
  const [center, setCenter] = useState(DEFAULT_CENTER);

  const [page, setPage] = useState(0);
  const [size] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1) 현재 위치 가져오기 (실패 시 서울 중심으로 fallback)
  useEffect(() => {
    if (!navigator.geolocation) {
      setUseDefaultCenter(true);
      setPosition(DEFAULT_CENTER);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        setCenter({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.warn('위치 정보 사용 불가, 기본 위치 사용:', err);
        setUseDefaultCenter(true);
        setPosition(DEFAULT_CENTER);
        setCenter(DEFAULT_CENTER);
      }
    );
  }, []);
  
  // 2) position 또는 page 변경될 때 주변 시설 조회
  useEffect(() => {
    const fetchFacilities = async () => {
      if (!position) return;

      try {
        setIsLoading(true);
        setError(null);

        const data = await getNearbyFacilities({
          lat: position.lat,
          lng: position.lng,
          radiusKm: 5,
          page,
          size,
        });

        console.log('시설 API 응답:', data);

        setCenter(data.center ?? position);
        setMarkers(data.markers ?? []);
        setFacilities(data.content ?? []);
        setTotalPages(data.totalPages ?? 0);
        setTotalCount(data.totalCount ?? (data.content?.length ?? 0));
      } catch (err) {
        console.error(err);
        setError('체육시설 정보를 불러오지 못했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacilities();
  }, [position, page, size]);

  // 3) 지도 스크립트 로드
  const loadNaverMapScript = () => {
    return new Promise((resolve, reject) => {
      if (document.getElementById("naver-map-script")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "naver-map-script";
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${import.meta.env.VITE_NAVER_MAP_CLIENT_ID}`;
      script.onload = () => {
        console.log('네이버 지도 스크립트 로드 완료');
        resolve();
      };
      script.onerror = (e) => {
        console.error('네이버 지도 스크립트 로드 실패', e);
        reject(e);
      };

      document.head.appendChild(script);
    });
  };

  // 4) 지도 초기화
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!center || !mapRef.current) return;

    loadNaverMapScript().then(() => {
      const { naver } = window;
      if (!naver || !naver.maps) return;

      const map = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom: 12,
      });

      mapInstanceRef.current = map;

      markers.forEach((m) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(m.lat, m.lng),
          map,
          title: m.name,
        });
      });
    });
  }, [center, markers]);

  // 5) 현재 위치에서 재검색
  const handleSearchHere = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const centerLatLng = map.getCenter();
    const newCenter = {
      lat: centerLatLng.lat(),
      lng: centerLatLng.lng(),
    };

    // 지도 중심 기준으로 재검색
    setPosition(newCenter);
    setCenter(newCenter);   // 지도 중심 맞추기
    setPage(0);             // 페이지 0으로 리셋
  };

  // 페이징
  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prev) => (totalPages ? Math.min(prev + 1, totalPages - 1) : prev + 1));
  };

  return (
    <>
      <StFacilityWrapper>
        <Header />

        <StInner>
          {/* 페이지 타이틀 */}
          <StPageHeader>
            <StPageTitle>체육시설 찾기</StPageTitle>
            <StPageSubTitle>
              {useDefaultCenter
                ? '현재 위치를 가져올 수 없어 서울 시청 기준으로 시설을 보여드려요.'
                : '내 주변 공공 체육시설을 확인해보세요.'}
            </StPageSubTitle>
          </StPageHeader>

          {/* 지도 섹션 – 실제 지도 대신 placeholder + 마커 리스트 */}
          {/* <StMapCard>
            <StMapInner>
              <StMapIcon>📍</StMapIcon>
              <StMapTitle>지도 뷰 (MVP)</StMapTitle>
              <StMapDescription>
                실제 서비스에서는 지도 API를 연동하여 시설 위치를 표시합니다.
                <br />
                현재는 주변 시설을 대표하는 마커 이름만 보여주고 있어요.
              </StMapDescription> */}

              <StSearchHereButton type="button" onClick={handleSearchHere}>
                이 위치에서 재검색
              </StSearchHereButton>

              <StMapBox ref={mapRef} />

              {/* <StMapCenterText>
                중심 좌표: {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
              </StMapCenterText>

              <StMapBadgeContainer>
                {markers.map((marker) => (
                  <StMapBadge key={marker.id}>📍 {marker.name}</StMapBadge>
                ))}
                {!isLoading && markers.length === 0 && (
                  <StMapEmptyText>주변에 표시할 시설 마커가 없습니다.</StMapEmptyText>
                )}
              </StMapBadgeContainer>
            </StMapInner>
          </StMapCard> */}

          {/* 검색/필터 – 현재는 UI만 (API X) */}
          {/* <StFilterCard>
            <StFilterTitle>검색 필터 (UI만, 아직 기능 연결 X)</StFilterTitle>
            <StFilterGrid>
              <StFilterField>
                <StLabel htmlFor="search">검색어</StLabel>
                <StInputWrapper>
                  <StInputIcon>🔍</StInputIcon>
                  <StInput
                    id="search"
                    placeholder="시설명, 시군구..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </StInputWrapper>
              </StFilterField>

              <StFilterField>
                <StLabel htmlFor="region">지역</StLabel>
                <StSelect
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="서울특별시">서울특별시</option>
                  <option value="부산광역시">부산광역시</option>
                  <option value="인천광역시">인천광역시</option>
                  <option value="대구광역시">대구광역시</option>
                  <option value="경기도">경기도</option>
                </StSelect>
              </StFilterField>

              <StFilterField>
                <StLabel htmlFor="type">시설 유형</StLabel>
                <StSelect
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="체육관">체육관</option>
                  <option value="수영장">수영장</option>
                  <option value="운동장">운동장</option>
                  <option value="종합체육시설">종합체육시설</option>
                </StSelect>
              </StFilterField>
            </StFilterGrid>
          </StFilterCard> */}

          {/* 결과 요약 + 페이지네이션 */}
          <StResultHeader>
            {error ? (
              <StErrorText>{error}</StErrorText>
            ) : isLoading ? (
              <StResultText>체육시설 정보를 불러오는 중입니다...</StResultText>
            ) : (
              <StResultText>
                총 <StResultStrong>{totalCount}</StResultStrong>개의 시설
                {totalPages > 0 && ` · ${page + 1}/${totalPages} 페이지`}
              </StResultText>
            )}
          </StResultHeader>

          {/* 시설 리스트 */}
          {!isLoading && !error && facilities.length > 0 && (
            <>
              <StCardGrid>
                {facilities.map((facility) => (
                  <StFacilityCard key={facility.id}>
                    <StFacilityCardHeader>
                      <StFacilityTitle>{facility.name}</StFacilityTitle>
                      {facility.facilityType && <StBadge>{facility.facilityType}</StBadge>}
                    </StFacilityCardHeader>

                    <StFacilityBody>
                      <StFacilityRow>
                        <StRowIcon>
                          <MapPin size={16} />
                        </StRowIcon>
                        <StRowText>{facility.roadAddr}</StRowText>
                      </StFacilityRow>

                      {facility.tel && (
                        <StFacilityRow>
                          <StRowIcon>
                            <Phone size={16} />
                          </StRowIcon>
                          <StRowText>{facility.tel}</StRowText>
                        </StFacilityRow>
                      )}

                      {facility.area && (
                        <StFacilityRow>
                          <StRowIcon>
                            <Ruler size={16} />
                          </StRowIcon>
                          <StRowText>면적: {facility.area}㎡</StRowText>
                        </StFacilityRow>
                      )}

                      {facility.deptName && (
                        <StFacilityRow>
                          <StRowIcon>
                            <Building2 size={16} />
                          </StRowIcon>
                          <StRowText>관리 부서: {facility.deptName}</StRowText>
                        </StFacilityRow>
                      )}
                    </StFacilityBody>

                    <StFacilityFooter>
                      {facility.homepageUrl && (
                        <StOutlineButton
                          as="a"
                          href={facility.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe size={16} />
                          <span>홈페이지</span>
                        </StOutlineButton>
                      )}
                      <StPrimaryButton type="button">
                        <MapPin size={16} />
                        <span>지도보기</span>
                      </StPrimaryButton>
                    </StFacilityFooter>
                  </StFacilityCard>
                ))}
              </StCardGrid>

              {totalPages > 1 && (
                <StPagination>
                  <StPaginationButton
                    type="button"
                    onClick={handlePrevPage}
                    disabled={page === 0}
                  >
                    이전
                  </StPaginationButton>
                  <StPaginationInfo>
                    {page + 1} / {totalPages}
                  </StPaginationInfo>
                  <StPaginationButton
                    type="button"
                    onClick={handleNextPage}
                    disabled={page + 1 >= totalPages}
                  >
                    다음
                  </StPaginationButton>
                </StPagination>
              )}
            </>
          )}

          {/* 빈 상태 */}
          {!isLoading && !error && facilities.length === 0 && (
            <StEmptyCard>
              <StEmptyIcon>
                <MapPin size={28} />
              </StEmptyIcon>
              <StEmptyTitle>검색 조건에 맞는 시설이 없습니다.</StEmptyTitle>
              <StEmptySubText>다른 조건으로 다시 시도해보세요.</StEmptySubText>
            </StEmptyCard>
          )}
        </StInner>

      </StFacilityWrapper>
    </>
  );
};

export default Facility;

const StFacilityWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const StInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`;

const StPageHeader = styled.header`
  margin-bottom: 24px;
`;

const StPageTitle = styled.h1`
  ${({ theme }) => theme.fonts.Title1};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 8px;
`;

const StPageSubTitle = styled.p`
  ${({ theme }) => theme.fonts.Body3};
  color: ${({ theme }) => theme.colors.Gray700};
`;

/* 지도 카드 */

const StMapCard = styled.section`
  width: 100%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.White};
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
  margin-bottom: 32px;
  overflow: hidden;
`;

const StMapInner = styled.div`
  padding: 32px 24px 28px;
  text-align: center;
`;

const StMapIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

const StMapTitle = styled.h2`
  ${({ theme }) => theme.fonts.Title5};
  color: ${({ theme }) => theme.colors.Gray900};
  margin-bottom: 8px;
`;

const StMapDescription = styled.p`
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Gray600};
  margin-bottom: 12px;
`;

const StMapCenterText = styled.p`
  ${({ theme }) => theme.fonts.Body7};
  color: ${({ theme }) => theme.colors.Gray500};
  margin-bottom: 20px;
`;

const StMapBadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
`;

const StMapBadge = styled.span`
  ${({ theme }) => theme.fonts.Body7};
  padding: 4px 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Gray100};
  color: ${({ theme }) => theme.colors.Gray800};
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.MainGreen};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StMapEmptyText = styled.p`
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray500};
`;

/* 결과 헤더 */

const StResultHeader = styled.div`
  margin-bottom: 12px;
`;

const StResultText = styled.p`
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Gray600};
`;

const StResultStrong = styled.span`
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Gray900};
`;

/* 에러 */

const StErrorText = styled.p`
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Red500};
  margin-bottom: 8px;
`;

/* 카드 그리드 */

const StCardGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StFacilityCard = styled.article`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.White};
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
  padding: 18px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StFacilityCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;

const StFacilityTitle = styled.h3`
  ${({ theme }) => theme.fonts.Title6};
  color: ${({ theme }) => theme.colors.Gray900};
`;

const StBadge = styled.span`
  ${({ theme }) => theme.fonts.Body7};
  padding: 4px 8px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.MainGreen}1A;
  color: ${({ theme }) => theme.colors.MainGreen};
  white-space: nowrap;
`;

const StFacilityBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
`;

const StFacilityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StRowIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

const StRowText = styled.p`
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray700};
  line-height: 1.4; 
`;

const StFacilityFooter = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 8px;
`;

const StOutlineButton = styled.button`
  flex: 1;
  ${({ theme }) => theme.fonts.Body6};
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.Gray800};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray100};
  }
`;

const StPrimaryButton = styled.button`
  flex: 1;
  ${({ theme }) => theme.fonts.Body6};
  padding: 8px 10px;
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.MainGreen};
  color: ${({ theme }) => theme.colors.White};
  cursor: pointer;
  transition: background-color 0.15s ease;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.MainGreenDark || theme.colors.MainGreen};
  }
`;

/* 페이지네이션 */

const StPagination = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const StPaginationButton = styled.button`
  ${({ theme }) => theme.fonts.Body6};
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  background-color: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray800};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.Gray100};
  }
`;

const StPaginationInfo = styled.span`
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray700};
`;

/* 빈 상태 */

const StEmptyCard = styled.div`
  margin-top: 24px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.White};
  border: 1px dashed ${({ theme }) => theme.colors.Gray300};
  padding: 32px 20px;
  text-align: center;
`;

const StEmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const StEmptyTitle = styled.p`
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Gray800};
`;

const StEmptySubText = styled.p`
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray600};
  margin-top: 4px;
`;

/* 필터 카드 */

// const StFilterCard = styled.section`
//   width: 100%;
//   border-radius: 16px;
//   background-color: ${({ theme }) => theme.colors.White};
//   box-shadow: 0 2px 12px rgba(15, 23, 42, 0.05);
//   padding: 20px 24px 24px;
//   margin-bottom: 24px;
// `;

// const StFilterTitle = styled.h3`
//   ${({ theme }) => theme.fonts.Title6};
//   color: ${({ theme }) => theme.colors.Gray900};
//   margin-bottom: 16px;
// `;

// const StFilterGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1.2fr 1fr 1fr;
//   gap: 16px;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const StFilterField = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 6px;
// `;

// const StLabel = styled.label`
//   ${({ theme }) => theme.fonts.Body7};
//   color: ${({ theme }) => theme.colors.Gray700};
// `;

// const StInputWrapper = styled.div`
//   position: relative;
//   width: 100%;
// `;

// const StInputIcon = styled.span`
//   position: absolute;
//   left: 12px;
//   top: 50%;
//   transform: translateY(-50%);
//   font-size: 14px;
// `;

// const StInput = styled.input`
//   width: 100%;
//   padding: 8px 12px 8px 32px;
//   border-radius: 10px;
//   border: 1px solid ${({ theme }) => theme.colors.Gray300};
//   ${({ theme }) => theme.fonts.Body6};
//   color: ${({ theme }) => theme.colors.Gray900};
//   background-color: ${({ theme }) => theme.colors.Gray0};

//   &:focus {
//     outline: none;
//     border-color: ${({ theme }) => theme.colors.MainGreen};
//     box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.2);
//   }
// `;

// const StSelect = styled.select`
//   width: 100%;
//   padding: 8px 12px;
//   border-radius: 10px;
//   border: 1px solid ${({ theme }) => theme.colors.Gray300};
//   ${({ theme }) => theme.fonts.Body6};
//   color: ${({ theme }) => theme.colors.Gray900};
//   background-color: ${({ theme }) => theme.colors.Gray0};

//   &:focus {
//     outline: none;
//     border-color: ${({ theme }) => theme.colors.MainGreen};
//     box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.2);
//   }
// `;

// 지도 영역
const StMapBox = styled.div`
  width: 100%;
  height: 360px;
  margin-top: 16px;
  border-radius: 12px;
  background-color: #e5e5e5;
`;

// 현재 위치에서 재검색 버튼
const StSearchHereButton = styled.button`
  ${({ theme }) => theme.fonts.Body7};
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  background-color: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray800};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray100};
  }
`;
