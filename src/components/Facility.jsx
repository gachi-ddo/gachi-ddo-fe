import styled from 'styled-components';

import Header from './Header';

const Facility = () => {
  return (
    <>
      <StFacilityWrapper>
        <Header />
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
