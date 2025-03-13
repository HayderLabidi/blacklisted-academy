import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CourseProvider } from '@/contexts/CourseContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import Navbar from '@/components/Navbar';
import Index from '@/pages/Index';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';
import StudentDashboard from '@/pages/StudentDashboard';
import CourseViewer from '@/pages/CourseViewer';
import Courses from '@/pages/Courses';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      {!isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" replace />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {isAdmin ? <Navigate to="/admin" replace /> : <StudentDashboard />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <ProtectedRoute>
              <CourseViewer />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <CourseProvider>
              <AppRoutes />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    padding: '12px 24px',
                  },
                }}
              />
            </CourseProvider>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
