import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'
import ProtectedRoute from './protectedRoutes/ProtectedRoute'
import NonProtectedRoute from './protectedRoutes/NonProtectedRoute'
import NotFound from './pages/NotFound'
import CaptainHome from './pages/CaptainHome'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <NonProtectedRoute>
              <Start />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/user-register"
          element={
            <NonProtectedRoute>
              <UserRegister />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/user-login"
          element={
            <NonProtectedRoute>
              <UserLogin />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/captain-register"
          element={
            <NonProtectedRoute>
              <CaptainRegister />
            </NonProtectedRoute>
          }
        />
        <Route
          path="/captain-login"
          element={
            <NonProtectedRoute>
              <CaptainLogin />
            </NonProtectedRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute role="user">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/captain-home"
          element={
            <ProtectedRoute role="captain">
              <CaptainHome />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App