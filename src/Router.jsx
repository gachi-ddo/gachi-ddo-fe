import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';

const Router = () => {
  const location = useLocation();

  return (
    <>
      <Suspense>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Router;
