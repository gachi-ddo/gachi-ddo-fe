import styled from 'styled-components';

import Header from './Header';

const Club = () => {
  return (
    <>
      <StClubWrapper>
        <Header />
      </StClubWrapper>
    </>
  );
};

export default Club;

const StClubWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
