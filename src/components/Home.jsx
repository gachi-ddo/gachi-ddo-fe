import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IcLocation, IcPeople } from '../assets/icons';
import Header from './Header';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <StMainWrapper>
        <StHeroSection>
          <StTitle>
            함께 운동하는 <StHighlight>즐거움</StHighlight>
          </StTitle>

          <StSubTitle>
            당신의 취향, 가까운 지역, 함께할 동료를 손쉽게 찾아보세요.
            <br />
            동호회와 시설을 한 곳에서 검색하고 추천받을 수 있습니다.
          </StSubTitle>

          <StButtonGroup>
            <StCTAButton type="button" onClick={() => navigate('/club')}>
              <StButtonIcon>
                <img src={IcPeople} alt="people icon" />
              </StButtonIcon>
              동호회 찾기
            </StCTAButton>
            <StCTAButton type="button" onClick={() => navigate('/facility')}>
              <StButtonIcon>
                <img src={IcLocation} alt="location icon" />
              </StButtonIcon>
              시설 찾기
            </StCTAButton>
          </StButtonGroup>
        </StHeroSection>

        <StAboutSection>
          <StAboutTitle>About Our Service</StAboutTitle>
          <StAboutText>
            We believe everyone deserves access to sports and fitness communities. Our platform
            makes it easy to find clubs that match your interests and accessibility needs.
          </StAboutText>
          <StAboutText>
            Whether you're looking for competitive sports, casual recreation, or inclusive programs
            for people with disabilities, we help you connect with the right community.
          </StAboutText>
        </StAboutSection>

        <StFooter>
          © 2025 Find Your Sports Crew. Helping communities connect through sports.
        </StFooter>
      </StMainWrapper>
    </>
  );
};

export default Home;

const StMainWrapper = styled.main`
  position: relative;
  width: 100%;
  height: calc(100vh - 64px); /* Header 높이 제외 */
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.MainGreen} 0%,
    ${({ theme }) => theme.colors.Gray50} 30%
  );
`;

const StHeroSection = styled.section`
  text-align: center;
  max-width: 800px;
  max-height: 600px;

  padding: 150px 20px 200px;
`;

const StTitle = styled.h1`
  ${({ theme }) => theme.fonts.Title0};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 20px;
`;

const StSubTitle = styled.p`
  ${({ theme }) => theme.fonts.Body3};
  color: ${({ theme }) => theme.colors.Gray700};
  margin-bottom: 40px;
  line-height: 1.6;
`;

const StHighlight = styled.span`
  color: ${({ theme }) => theme.colors.MainGreen};
`;

const StButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const StCTAButton = styled.button`
  ${({ theme }) => theme.fonts.Body5};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;

  padding: 6px 20px;
  border-radius: 12px;
  border: ${({ theme }) => `1px solid ${theme.colors.Gray300}`};

  color: ${({ theme }) => theme.colors.Black};
  background-color: transparent;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.MainGreen};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StButtonIcon = styled.span`
  display: flex;
`;

const StAboutSection = styled.section`
  width: 100%;
  padding: 60px 20px 80px;
  background-color: ${({ theme }) => theme.colors.Gray50};

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StAboutTitle = styled.h2`
  ${({ theme }) => theme.fonts.Title5};
  color: ${({ theme }) => theme.colors.Gray800};
  margin-bottom: 24px;
`;

const StAboutText = styled.p`
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray600};
  max-width: 720px;
  line-height: 1.6;
  margin-bottom: 12px;
`;

const StFooter = styled.footer`
  width: 100%;
  padding: 20px 0 32px;
  text-align: center;
  ${({ theme }) => theme.fonts.Body6};
  color: ${({ theme }) => theme.colors.Gray500};
`;
