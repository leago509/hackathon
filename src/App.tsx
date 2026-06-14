import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { CareerPathsPage } from './pages/CareerPathsPage';
import { AICoachPage } from './pages/AICoachPage';
import { SalaryPage } from './pages/SalaryPage';
import { JobsPage } from './pages/JobsPage';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { UniversityDashboard } from './pages/UniversityDashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  switch (user.role) {
    case 'employer': return <EmployerDashboard />;
    case 'university': return <UniversityDashboard />;
    default: return <CandidateDashboard />;
  }
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/career-paths" element={<CareerPathsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
      <Route path="/ai-coach" element={<ProtectedRoute><AICoachPage /></ProtectedRoute>} />
      <Route path="/salary" element={<ProtectedRoute><SalaryPage /></ProtectedRoute>} />
      <Route path="/candidates" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
      <Route path="/graduates" element={<ProtectedRoute><UniversityDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
