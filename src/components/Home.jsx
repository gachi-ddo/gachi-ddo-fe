import { Award, Heart, MapPin, Search, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <StPageWrapper>
        <StInner>
          {/* Hero Section */}
          <StHeroSection>
            <StHeroContent>
              <StTitle>
                함께 운동하는 <StHighlight>즐거움</StHighlight>
              </StTitle>

              <StSubTitle>
                내 주변의 운동 동호회와 체육시설을 쉽게 찾아보세요.
                <br />
                모두가 함께하는 포용적인 스포츠 커뮤니티를 지향합니다.
              </StSubTitle>

              <StButtonGroup>
                <StCTAButton type="button" onClick={() => navigate('/club')}>
                  <Users className="icon" size={18} />
                  동호회 찾기
                </StCTAButton>

                <StCTAButton type="button" onClick={() => navigate('/facility')}>
                  <MapPin className="icon" size={18} />
                  시설 찾기
                </StCTAButton>
              </StButtonGroup>
            </StHeroContent>
          </StHeroSection>

          {/* Features Section */}
          <StFeatureSection>
            <StSectionHeader>
              <StSectionTitle>같이뚜!의 특별함</StSectionTitle>
              <StSectionSubTitle>모두를 위한 운동 플랫폼</StSectionSubTitle>
            </StSectionHeader>

            <StFeatureGrid>
              <StFeatureCard>
                <StFeatureIconBox>
                  <Search size={22} />
                </StFeatureIconBox>
                <StFeatureTitle>쉬운 검색</StFeatureTitle>
                <StFeatureText>
                  지역, 종목, 유형별로 원하는 동호회를 손쉽게 찾을 수 있어요. 필요한 조건만 골라
                  나에게 맞는 모임을 검색해보세요.
                </StFeatureText>
              </StFeatureCard>

              <StFeatureCard>
                <StFeatureIconBox>
                  <Heart size={22} />
                </StFeatureIconBox>
                <StFeatureTitle>포용적 커뮤니티</StFeatureTitle>
                <StFeatureText>
                  장애인·비장애인 모두가 함께 운동할 수 있는 환경을 지향합니다. 접근성과 참여 기회를
                  함께 고민해요.
                </StFeatureText>
              </StFeatureCard>

              <StFeatureCard>
                <StFeatureIconBox>
                  <Award size={22} />
                </StFeatureIconBox>
                <StFeatureTitle>공공데이터 기반</StFeatureTitle>
                <StFeatureText>
                  공공데이터를 기반으로 신뢰할 수 있는 정보를 제공해요. 동호회와 공공체육시설 정보를
                  한곳에서 확인할 수 있습니다.
                </StFeatureText>
              </StFeatureCard>
            </StFeatureGrid>
          </StFeatureSection>

          {/* Main Action Cards */}
          <StActionSection>
            <StActionGrid>
              <StActionCard role="button" onClick={() => navigate('/club')}>
                <StActionHeader>
                  <StActionIconBox>
                    <Users size={30} />
                  </StActionIconBox>
                  <StActionTitle>동호회 조회</StActionTitle>
                  <StActionDescription>
                    지역별, 종목별 운동 동호회를 검색하고 나에게 맞는 모임을 찾아보세요. 일반
                    동호회와 장애인 동호회 정보를 모두 제공합니다.
                  </StActionDescription>
                </StActionHeader>
                <StActionContent>
                  <StChipRow>
                    <StChip>농구</StChip>
                    <StChip>축구</StChip>
                    <StChip>배드민턴</StChip>
                    <StChip>+ 더보기</StChip>
                  </StChipRow>
                </StActionContent>
              </StActionCard>

              <StActionCard role="button" onClick={() => navigate('/facility')}>
                <StActionHeader>
                  <StActionIconBox>
                    <MapPin size={30} />
                  </StActionIconBox>
                  <StActionTitle>체육시설 조회</StActionTitle>
                  <StActionDescription>
                    지도를 통해 내 주변 공공 체육시설을 찾아보세요. 체육관, 수영장, 운동장 등 다양한
                    시설 정보를 한눈에 확인할 수 있습니다.
                  </StActionDescription>
                </StActionHeader>
                <StActionContent>
                  <StChipRow>
                    <StChip>체육관</StChip>
                    <StChip>수영장</StChip>
                    <StChip>운동장</StChip>
                    <StChip>+ 더보기</StChip>
                  </StChipRow>
                </StActionContent>
              </StActionCard>
            </StActionGrid>
          </StActionSection>

          {/* Footer */}
          <StFooter>
            <StFooterText>© 2025 같이뚜! All rights reserved.</StFooterText>
            <StFooterSubText>
              문화 빅데이터 플랫폼, 국민체육진흥공단 공공데이터 활용
            </StFooterSubText>
          </StFooter>
        </StInner>
      </StPageWrapper>
    </>
  );
};

export default Home;

/* ================= Styled Components ================= */

/**
 * 🔥 1) 전체 화면에 Hero 그라데이션 적용
 *  - Header(64px) 아래부터 하단까지 전부 gradient
 */
const StPageWrapper = styled.main`
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;

  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.MainGreen} 0%,
    ${({ theme }) => theme.colors.Gray50} 20%
  );
`;

const StInner = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 40px 20px 80px;
`;

/* ===== Hero ===== */

const StHeroSection = styled.section`
  width: 100%;
  padding: 80px 0 90px;
`;

const StHeroContent = styled.div`
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
`;

const StTitle = styled.h1`
  ${({ theme }) => theme.fonts.Title0};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 20px;
  word-break: keep-all;
`;

const StHighlight = styled.span`
  color: ${({ theme }) => theme.colors.MainGreen};
`;

const StSubTitle = styled.p`
  ${({ theme }) => theme.fonts.Body3};
  color: ${({ theme }) => theme.colors.Gray800};
  margin-bottom: 32px;
  line-height: 1.6;
`;

const StButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
`;

/**
 * 🔥 2) 버튼 하나만 사용
 *  - 기본은 Ghost 스타일 (흰 배경, 회색 아이콘/글자)
 *  - hover 시 Primary 스타일 (MainGreen 배경, 글자/아이콘 White)
 */
const StCTAButton = styled.button`
  ${({ theme }) => theme.fonts.Body4};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 10px 24px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  background-color: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Black};

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;

  .icon {
    color: ${({ theme }) => theme.colors.Gray700};
    transition: color 0.2s ease;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.MainGreen};
    border-color: ${({ theme }) => theme.colors.MainGreen};
    color: ${({ theme }) => theme.colors.White};

    .icon {
      color: ${({ theme }) => theme.colors.White};
    }
  }

  &:active {
    transform: translateY(1px);
  }
`;

/* ===== Features ===== */

const StFeatureSection = styled.section`
  width: 100%;
  padding: 32px 0 28px;
`;

const StSectionHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const StSectionTitle = styled.h2`
  ${({ theme }) => theme.fonts.Title3};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 8px;
`;

const StSectionSubTitle = styled.p`
  ${({ theme }) => theme.fonts.Body4};
  color: ${({ theme }) => theme.colors.Gray600};
`;

const StFeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
`;

const StFeatureCard = styled.article`
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.Gray200};
  padding: 18px 18px 20px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.02);
`;

const StFeatureIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background-color: rgba(46, 204, 113, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.MainGreen};
`;

const StFeatureTitle = styled.h3`
  ${({ theme }) => theme.fonts.Body3};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 6px;
`;

const StFeatureText = styled.p`
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray700};
  line-height: 1.5;
  word-break: keep-all;
`;

/* ===== Actions ===== */

const StActionSection = styled.section`
  width: 100%;
  padding: 24px 0 32px;
`;

const StActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

const StActionCard = styled.article`
  background-color: ${({ theme }) => theme.colors.White};
  border-radius: 22px;
  border: 2px solid ${({ theme }) => theme.colors.Gray200};
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.03);
  padding: 22px 20px 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease,
    transform 0.12s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.MainGreen};
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

const StActionHeader = styled.div`
  margin-bottom: 14px;
`;

const StActionIconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  background-color: ${({ theme }) => theme.colors.MainGreen};
  color: ${({ theme }) => theme.colors.White};
`;

const StActionTitle = styled.h3`
  ${({ theme }) => theme.fonts.Title5};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 6px;
`;

const StActionDescription = styled.p`
  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Gray700};
  line-height: 1.5;
  word-break: keep-all;
`;

const StActionContent = styled.div``;

const StChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const StChip = styled.span`
  ${({ theme }) => theme.fonts.Body6};
  padding: 4px 10px;
  border-radius: 999px;
  background-color: rgba(46, 204, 113, 0.1);
  color: ${({ theme }) => theme.colors.MainGreen};
`;

/* ===== Footer ===== */

const StFooter = styled.footer`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.Gray200};
  margin-top: 40px;
  padding-top: 20px;
  text-align: center;
`;

const StFooterText = styled.p`
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray600};
  margin-bottom: 4px;
`;

const StFooterSubText = styled.p`
  ${({ theme }) => theme.fonts.Caption1};
  color: ${({ theme }) => theme.colors.Gray500};
`;
