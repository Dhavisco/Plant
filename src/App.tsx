import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LandingPage from './components/page/Index';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useUserStore } from './store/useUserStore';
import { useEffect } from 'react';





function App() {

  const fetchUserData = useUserStore((state) => state.fetchUserData);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Create QueryClient
const queryClient = new QueryClient();

  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <ErrorBoundary>
      <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

        </Routes>
       </ErrorBoundary>
      </Router>
    </QueryClientProvider>
    
    

  )
}

export default App
