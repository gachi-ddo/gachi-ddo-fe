import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { IcLogo } from '../assets/icons';

const NAV_ITEMS = [
  { id: 1, label: '홈', path: '/' },
  { id: 2, label: '동호회 찾기', path: '/club' },
  { id: 3, label: '시설 찾기', path: '/facility' },
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <StHeaderWrapper>
      <StInner>
        <StLogoArea>
          <Link to="/">
            <img src={IcLogo} alt="logo" width={60} height={60} />
          </Link>
          <StLogoText>같이뚜</StLogoText>
        </StLogoArea>

        <StNav>
          {NAV_ITEMS.map(({ label, path }) => {
            const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path);

            return (
              <StNavItem key={path} $active={isActive}>
                <Link to={path}>{label}</Link>
              </StNavItem>
            );
          })}
        </StNav>
      </StInner>
    </StHeaderWrapper>
  );
};

export default Header;

const StHeaderWrapper = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.White};
  border-bottom: 1px solid ${({ theme }) => theme.colors.Gray200};
`;

const StInner = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const StLogoArea = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;

  img {
    cursor: pointer;
  }
`;

const StLogoText = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.Black};
  ${({ theme }) => theme.fonts.Title6};
  padding-bottom: 4px;
`;

const StNav = styled.nav`
  display: flex;
  gap: 24px;
  padding-right: 20px;
`;

const StNavItem = styled.div`
  a {
    text-decoration: none;
    color: ${({ theme, $active }) =>
      $active === true ? theme.colors.Black : theme.colors.Gray500};
    ${({ theme }) => theme.fonts.Body5};

    &:hover {
      color: ${({ theme }) => theme.colors.Gray800};
    }
  }
`;
