// src/pages/ClubDetailPage.jsx

import { Accessibility, ArrowLeft, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getClubDetail } from '../apis/club';
import Header from '../components/Header'; // 경로는 프로젝트 구조에 맞게 수정

const ClubDetail = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getClubDetail(clubId);
        setClub(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (clubId) {
      fetchDetail();
    }
  }, [clubId]);

  const handleBack = () => {
    // 리스트에서 왔다면 뒤로가기, 아니면 /club 으로
    if (window.history.state && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/club');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '정보 없음';
    // "2015-03-10" → "2015.03.10"
    return dateString.replaceAll('-', '.');
  };

  return (
    <>
      <Header />
      <StPageWrapper>
        <StInner>
          <StBackButton type="button" onClick={handleBack}>
            <ArrowLeft size={18} />
            <span>목록으로</span>
          </StBackButton>

          {loading && <StStatusText>동호회 정보를 불러오는 중입니다...</StStatusText>}
          {error && !loading && <StStatusText>동호회 정보를 불러오지 못했어요.</StStatusText>}
          {!loading && !error && !club && (
            <StStatusText>동호회 정보를 찾을 수 없습니다.</StStatusText>
          )}

          {club && (
            <StDetailCard>
              {/* 상단 헤더 영역 */}
              <StDetailHeader>
                <StTitleRow>
                  <StClubName>{club.clubName}</StClubName>
                  {club.disabled && (
                    <StDisabledBadge>
                      <Accessibility size={16} />
                      <span>장애인 동호회</span>
                    </StDisabledBadge>
                  )}
                </StTitleRow>

                <StMetaRow>
                  <MapPin size={18} />
                  <span>{club.address}</span>
                </StMetaRow>

                <StTagRow>
                  <StItemTag>{club.item}</StItemTag>
                </StTagRow>
              </StDetailHeader>

              {/* 구분선 */}
              <StDivider />

              {/* 내용 영역 */}
              <StContentSection>
                {/* 공통: 기본 정보 */}
                <StSectionBlock>
                  <StSectionTitle>기본 정보</StSectionTitle>
                  {!club.disabled && (
                    <StFullWidthInfo>
                      <StInfoLabel>대상 연령대</StInfoLabel>
                      <StInfoValue>{club.ageGroup || '연령 정보 없음'}</StInfoValue>
                    </StFullWidthInfo>
                  )}
                  <StInfoGrid>
                    {club.disabled ? (
                      <>
                        <StInfoItem>
                          <StInfoLabel>동호회 유형</StInfoLabel>
                          <StInfoValue>장애인 동호회</StInfoValue>
                        </StInfoItem>
                        <StInfoItem>
                          <StInfoLabel>장애 유형</StInfoLabel>
                          <StInfoValue>{club.disabilityType || '장애 유형 정보 없음'}</StInfoValue>
                        </StInfoItem>
                        <StInfoItem>
                          <StInfoLabel>운영 시간</StInfoLabel>
                          <StInfoValue>{club.operatingTime || '운영 시간 정보 없음'}</StInfoValue>
                        </StInfoItem>
                      </>
                    ) : (
                      <>
                        <StInfoItem>
                          <StInfoLabel>성별</StInfoLabel>
                          <StInfoValue>{club.genderType || '성별 미지정'}</StInfoValue>
                        </StInfoItem>
                        <StInfoItem>
                          <StInfoLabel>회원 수</StInfoLabel>
                          <StInfoValue>
                            {club.memberCount != null ? `${club.memberCount}명` : '정보 없음'}
                          </StInfoValue>
                        </StInfoItem>
                        <StInfoItem>
                          <StInfoLabel>설립일</StInfoLabel>
                          <StInfoValue>{formatDate(club.foundedAt)}</StInfoValue>
                        </StInfoItem>
                      </>
                    )}
                  </StInfoGrid>
                </StSectionBlock>

                {/* 소개 / 설명 */}
                <StSectionBlock>
                  <StSectionTitle>소개</StSectionTitle>
                  <StDescriptionBox>
                    {club.disabled ? (
                      <>
                        <p>
                          {club.description ||
                            '아직 소개가 등록되지 않았어요. 운영시간 또는 활동 내용을 직접 문의해보세요.'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>
                          활동 요일, 시간, 장소 등은 추후 동호회 소개 정보로 추가될 예정입니다.
                          <br />
                          지금은 대상 연령대, 성별, 회원 수 등 기본 정보를 확인할 수 있습니다.
                        </p>
                      </>
                    )}
                  </StDescriptionBox>
                </StSectionBlock>
              </StContentSection>
            </StDetailCard>
          )}
        </StInner>
      </StPageWrapper>
    </>
  );
};

export default ClubDetail;

// ================= styled-components =================

const StPageWrapper = styled.main`
  min-height: calc(100vh - 64px);
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.Gray50};
`;

const StInner = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 32px 20px 80px;
`;

const StBackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.Gray200};
  background-color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray700};
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray100};
  }
`;

const StStatusText = styled.p`
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Gray600};
`;

const StDetailCard = styled.section`
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.Gray200};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
  padding: 24px 24px 28px;
`;

const StDetailHeader = styled.header`
  margin-bottom: 16px;
`;

const StTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 10px;
`;

const StClubName = styled.h1`
  ${({ theme }) => theme.fonts.Title3};
  color: ${({ theme }) => theme.colors.Black};
`;

const StDisabledBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.Gray100};
  color: ${({ theme }) => theme.colors.Gray700};
  ${({ theme }) => theme.fonts.Body6};
`;

const StMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Gray700};
  margin-bottom: 8px;

  svg {
    flex-shrink: 0;
  }
`;

const StTagRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const StItemTag = styled.span`
  ${({ theme }) => theme.fonts.Body6};
  padding: 4px 10px;
  border-radius: 999px;
  background-color: rgba(46, 204, 113, 0.08);
  color: ${({ theme }) => theme.colors.MainGreen};
`;

const StDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.Gray200};
  margin: 12px 0 20px;
`;

const StContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StSectionBlock = styled.section``;

const StSectionTitle = styled.h2`
  ${({ theme }) => theme.fonts.Body3};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 12px;
`;

const StInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px 30px;
`;

const StInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StInfoLabel = styled.span`
  ${({ theme }) => theme.fonts.Caption1};
  color: ${({ theme }) => theme.colors.Gray500};
`;

const StInfoValue = styled.span`
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Black};
`;

const StDescriptionBox = styled.div`
  padding: 12px 14px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.Gray50};
  border: 1px solid ${({ theme }) => theme.colors.Gray200};

  p {
    ${({ theme }) => theme.fonts.Body4};
    color: ${({ theme }) => theme.colors.Gray700};
    line-height: 1.6;
    white-space: pre-line;
  }
`;

const StFullWidthInfo = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
