import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import CaptainRegister from './pages/CaptainRegister';
import CaptainLogin from './pages/CaptainLogin';
import Start from './pages/Start';
import NotFound from './pages/NotFound';
import CaptainHome from './pages/CaptainHome';
import UserProtectWrapper from './protectedRoutes/UserProtectWrapper';
import CaptainProtectWrapper from './protectedRoutes/CaptainProtectWrapper';
import NonProtectedWrapper from './protectedRoutes/NonProtectedWrapper';
import 'remixicon/fonts/remixicon.css'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <NonProtectedWrapper>
              <Start />
            </NonProtectedWrapper>
          }
        />
        <Route
          path="/user-register"
          element={
            <NonProtectedWrapper>
              <UserRegister />
            </NonProtectedWrapper>
          }
        />
        <Route
          path="/user-login"
          element={
            <NonProtectedWrapper>
              <UserLogin />
            </NonProtectedWrapper>
          }
        />
        <Route
          path="/captain-register"
          element={
            <NonProtectedWrapper>
              <CaptainRegister />
            </NonProtectedWrapper>
          }
        />
        <Route
          path="/captain-login"
          element={
            <NonProtectedWrapper>
              <CaptainLogin />
            </NonProtectedWrapper>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;