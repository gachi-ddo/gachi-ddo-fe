import { Accessibility, ChevronDown, Filter, MapPin, Search, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getClubList } from '../apis/club.js';
import Header from './Header';

const Club = () => {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [page, setPage] = useState(0);
  const [size] = useState(12); // 한 번에 불러올 개수
  const [totalCount, setTotalCount] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // 무한 스크롤용 sentinel
  const sentinelRef = useRef(null);

  // ---------- API 호출 함수 ----------
  const loadClubs = async (nextPage, isReset = false) => {
    if (loading) return;
    if (!isReset && isLastPage) return;

    try {
      setLoading(true);

      const isDisabled = selectedType === 'all' ? undefined : selectedType === 'disabled';

      const response = await getClubList({
        page: nextPage,
        size,
        name: searchTerm.trim() || undefined, // 백엔드에서 name 쓰면
        ctprvn: selectedRegion === 'all' ? undefined : selectedRegion,
        item: selectedSport === 'all' ? undefined : selectedSport,
        isDisabled, // 쿼리파라미터 isDisabled
      });

      const newClubs = response.clubList || [];

      if (isReset) {
        setClubs(newClubs);
      } else {
        setClubs((prev) => [...prev, ...newClubs]);
      }

      setPage(response.page ?? nextPage);
      setTotalCount(response.totalCount ?? 0);
      setIsLastPage(response.isLastPage ?? false);
    } catch (error) {
      console.error('동호회 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // ---------- 필터 변경 시 첫 페이지 다시 로드 ----------
  useEffect(() => {
    setIsLastPage(false);
    loadClubs(0, true); // page 0부터 새로
  }, [searchTerm, selectedRegion, selectedSport, selectedType]);

  // ---------- 무한 스크롤 IntersectionObserver ----------
  useEffect(() => {
    if (isLastPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          // 다음 페이지 요청
          loadClubs(page + 1);
        }
      },
      {
        threshold: 1.0,
      },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      observer.disconnect();
    };
  }, [page, isLastPage, loading]); // page / isLastPage / loading 이 바뀔 때만 재설정

  return (
    <>
      <Header />
      <StClubWrapper>
        <StInner>
          {/* 페이지 헤더 */}
          <StPageHeader>
            <StPageTitle>동호회 찾기</StPageTitle>
            <StPageSubTitle>내 지역의 운동 동호회를 검색해보세요</StPageSubTitle>
          </StPageHeader>

          {/* 필터 카드 */}
          <StFilterCard>
            <StFilterHeader>
              <StFilterTitle>
                <Filter size={18} />
                <span>검색 필터</span>
              </StFilterTitle>
            </StFilterHeader>

            <StFilterBody>
              {/* 검색어 */}
              <StFilterItem>
                <StLabel htmlFor="search">동호회명</StLabel>
                <StInputWrapper>
                  <StSearchIcon>
                    <Search size={16} />
                  </StSearchIcon>
                  <StInput
                    id="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </StInputWrapper>
              </StFilterItem>

              {/* 지역 */}
              <StFilterItem>
                <StLabel htmlFor="region">지역</StLabel>
                <StSelectWrapper>
                  <StSelect
                    id="region"
                    value={selectedRegion}
                    onChange={(event) => setSelectedRegion(event.target.value)}
                  >
                    <option value="all">전체</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="인천광역시">인천광역시</option>
                    <option value="대구광역시">대구광역시</option>
                    <option value="경기도">경기도</option>
                  </StSelect>
                  <StSelectIcon>
                    <ChevronDown size={16} />
                  </StSelectIcon>
                </StSelectWrapper>
              </StFilterItem>

              {/* 종목 */}
              <StFilterItem>
                <StLabel htmlFor="sport">종목</StLabel>
                <StSelectWrapper>
                  <StSelect
                    id="sport"
                    value={selectedSport}
                    onChange={(event) => setSelectedSport(event.target.value)}
                  >
                    <option value="all">전체</option>
                    <option value="농구">농구</option>
                    <option value="축구">축구</option>
                    <option value="배드민턴">배드민턴</option>
                    <option value="탁구">탁구</option>
                    <option value="게이트볼">게이트볼</option>
                  </StSelect>
                  <StSelectIcon>
                    <ChevronDown size={16} />
                  </StSelectIcon>
                </StSelectWrapper>
              </StFilterItem>

              {/* 유형 */}
              <StFilterItem>
                <StLabel htmlFor="type">유형</StLabel>
                <StSelectWrapper>
                  <StSelect
                    id="type"
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                  >
                    <option value="all">전체</option>
                    <option value="general">일반 동호회</option>
                    <option value="disabled">장애인 동호회</option>
                  </StSelect>
                  <StSelectIcon>
                    <ChevronDown size={16} />
                  </StSelectIcon>
                </StSelectWrapper>
              </StFilterItem>
            </StFilterBody>
          </StFilterCard>

          {/* 결과 개수 */}
          <StResultHeader>
            <StResultText>
              총 <StResultCount>{totalCount}</StResultCount>개의 동호회
            </StResultText>
          </StResultHeader>

          {/* 카드 그리드 */}
          <StCardGrid>
            {clubs.map((club) => (
              <StClubCard key={club.clubId}>
                <StClubCardHeader>
                  <StClubTitleRow>
                    <StClubName>{club.clubName}</StClubName>

                    {club.disabled && (
                      <StDisabledIconBadge>
                        <Accessibility size={16} />
                      </StDisabledIconBadge>
                    )}
                  </StClubTitleRow>

                  <StClubMeta>
                    {/* 주소 */}
                    <StMetaRow>
                      <MapPin size={16} />
                      <span>{club.address}</span>
                    </StMetaRow>

                    {/* Users 아이콘 + 텍스트 분기 */}
                    <StMetaRow>
                      <Users size={16} />
                      {club.disabled ? (
                        // 장애인 동호회: disabilityType 표시
                        <span>{club.disabilityType || '장애 유형 정보 없음'}</span>
                      ) : (
                        // 비장애인 동호회: 성별 + 회원수
                        <span>
                          {club.genderType || '성별 미지정'} · 회원 {club.memberCount ?? 0}명
                        </span>
                      )}
                    </StMetaRow>
                  </StClubMeta>
                </StClubCardHeader>

                <StClubCardBody>
                  <StBadgeRow>
                    <StSportBadge>{club.item}</StSportBadge>
                    {club.disabled && club.disabilityType && (
                      <StDisabilityBadge>{club.disabilityType}</StDisabilityBadge>
                    )}
                  </StBadgeRow>

                  <StDetailButton type="button" onClick={() => navigate(`/club/${club.clubId}`)}>
                    자세히 보기
                  </StDetailButton>
                </StClubCardBody>
              </StClubCard>
            ))}
          </StCardGrid>

          {clubs.length === 0 && !loading && (
            <StEmptyCard>
              <StEmptyInner>
                <Users size={40} />
                <StEmptyTitle>검색 조건에 맞는 동호회가 없습니다.</StEmptyTitle>
                <StEmptySubTitle>다른 조건으로 다시 검색해보세요.</StEmptySubTitle>
              </StEmptyInner>
            </StEmptyCard>
          )}

          {/* 무한 스크롤 sentinel */}
          <StSentinel ref={sentinelRef} />

          {loading && <StLoadingText>불러오는 중...</StLoadingText>}
        </StInner>
      </StClubWrapper>
    </>
  );
};

export default Club;

const StClubWrapper = styled.main`
  min-height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.Gray50};
`;

const StInner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px 80px;
`;

const StPageHeader = styled.header`
  margin-bottom: 32px;
`;

const StPageTitle = styled.h1`
  ${({ theme }) => theme.fonts.Title2};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 8px;
`;

const StPageSubTitle = styled.p`
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Gray700};
`;

// 필터 카드

const StFilterCard = styled.section`
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.Gray200};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.02);
  padding: 20px 24px 24px;
  margin-bottom: 32px;
`;

const StFilterHeader = styled.div`
  margin-bottom: 16px;
`;

const StFilterTitle = styled.h2`
  ${({ theme }) => theme.fonts.Body4};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.Black};
`;

const StFilterBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
`;

const StFilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StLabel = styled.label`
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Gray700};
`;

const StInputWrapper = styled.div`
  position: relative;
`;

const StSearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.Gray400};

  svg {
    display: block;
  }
`;

const StInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px 0 32px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  background-color: ${({ theme }) => theme.colors.White};

  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray400};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.MainGreen};
    box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.2);
  }
`;

const StSelectWrapper = styled.div`
  position: relative;
`;

const StSelect = styled.select`
  width: 100%;
  height: 40px;
  padding: 0 36px 0 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  background-color: ${({ theme }) => theme.colors.White};

  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Black};

  appearance: none; /* 기본 화살표 숨기기 */
  -moz-appearance: none;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.MainGreen};
    box-shadow: 0 0 0 2px rgba(46, 204, 113, 0.2);
  }
`;

const StSelectIcon = styled.div`
  position: absolute;
  right: 14px; /* 여기 숫자를 줄이면 더 왼쪽으로, 늘리면 더 오른쪽 */
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.Gray500};

  svg {
    display: block;
  }
`;

// 결과 헤더

const StResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StResultText = styled.p`
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Gray700};
`;

const StResultCount = styled.span`
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Black};
  font-weight: 600;
`;

// 카드 그리드

const StCardGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

const StClubCard = styled.article`
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.Gray200};
  padding: 20px 20px 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StClubCardHeader = styled.div`
  margin-bottom: 16px;
`;

const StClubTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
`;

const StClubName = styled.h3`
  ${({ theme }) => theme.fonts.Title5};
  color: ${({ theme }) => theme.colors.Black};
`;

const StDisabledIconBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Gray100};
  color: ${({ theme }) => theme.colors.Gray700};
`;

const StClubMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Gray700};

  svg {
    flex-shrink: 0;
  }
`;

const StClubCardBody = styled.div``;

const StBadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const StSportBadge = styled.span`
  ${({ theme }) => theme.fonts.Body6};
  padding: 4px 10px;
  border-radius: 10px;
  background-color: rgba(46, 204, 113, 0.1);
  color: ${({ theme }) => theme.colors.MainGreen};
`;

const StDisabilityBadge = styled.span`
  ${({ theme }) => theme.fonts.Body6};
  padding: 4px 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  color: ${({ theme }) => theme.colors.Gray700};
`;

const StDetailButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 13px;
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  background-color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Black};
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.MainGreen};
    color: ${({ theme }) => theme.colors.White};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }
`;

// 빈 상태

const StEmptyCard = styled.section`
  margin-top: 24px;
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.Gray200};
  padding: 40px 20px;
`;

const StEmptyInner = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.Gray600};

  svg {
    margin: 0 auto 12px;
  }
`;

const StEmptyTitle = styled.p`
  ${({ theme }) => theme.fonts.Body2};
  margin-bottom: 4px;
`;

const StEmptySubTitle = styled.p`
  ${({ theme }) => theme.fonts.Body4};
`;

const StSentinel = styled.div`
  width: 100%;
  height: 1px;
`;

const StLoadingText = styled.p`
  margin-top: 16px;
  text-align: center;
  ${({ theme }) => theme.fonts.Caption1};
  color: ${({ theme }) => theme.colors.Gray500};
`;
