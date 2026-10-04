import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthForm mode="login" />} />
      <Route path="/register" element={<AuthForm mode="register" />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}