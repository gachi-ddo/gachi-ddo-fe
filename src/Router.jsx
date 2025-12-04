import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import ClubPage from './pages/ClubPage';
import FacilityPage from './pages/FacilityPage';
import HomePage from './pages/HomePage';

const Router = () => {
  const location = useLocation();

  return (
    <>
      <Suspense>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/club" element={<ClubPage />} />
          <Route path="/facility" element={<FacilityPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Router;
