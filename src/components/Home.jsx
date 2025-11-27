import React from 'react';
import styled from 'styled-components';

import { IcLogo } from '../assets/icons';

const Home = () => {
  return (
    <>
      <StMainWrapper>
        <img src={IcLogo} alt="logo" />
        <p>같이 뚜!!</p>
      </StMainWrapper>
    </>
  );
};

export default Home;

const StMainWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.colors.MainGreen};
  ${({ theme }) => theme.fonts.Title0};
`;
