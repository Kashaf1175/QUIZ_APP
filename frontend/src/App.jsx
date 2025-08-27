import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import QuizList from './components/QuizList';
import CreateQuiz from './components/CreateQuiz';
import MyQuizzes from './components/MyQuizzes';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

// Main App Layout
const AppLayout = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar />}
      <main className={user ? "pt-16" : ""}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/auth/login" element={<AuthPage isRegister={false} />} />
            <Route path="/auth/register" element={<AuthPage isRegister={true} />} />
            <Route path="/auth" element={<Navigate to="/auth/login" />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/quizzes" 
              element={
                <ProtectedRoute>
                  <QuizList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-quiz" 
              element={
                <ProtectedRoute>
                  <CreateQuiz />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-quizzes" 
              element={
                <ProtectedRoute>
                  <MyQuizzes />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/auth" />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;