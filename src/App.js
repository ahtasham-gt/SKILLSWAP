import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from './store/slices/skillsSlice';
import { fetchSwaps } from './store/slices/swapsSlice';
import { addNotification } from './store/slices/uiSlice';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import NotificationContainer from './components/ui/NotificationContainer';

// Pages
import Home from './pages/Home';
import Skills from './pages/Skills';
import Swaps from './pages/Swaps';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AddSkill from './pages/AddSkill';

// Styles
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { sidebarOpen } = useSelector(state => state.ui);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchSkills());
      dispatch(fetchSwaps());
      
      // Welcome notification
      dispatch(addNotification({
        type: 'success',
        title: 'Welcome to SkillSwap!',
        message: 'Start exploring skills and connecting with others.'
      }));
    }
  }, [dispatch, isAuthenticated]);

  // If not authenticated, render only the login page without the main layout
  if (!isAuthenticated) {
    return (
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <NotificationContainer />
      </div>
    );
  }

  // If authenticated, render the full layout
  return (
    <div className="app">
      <Header />
      
      <div className="main-content">
        <Sidebar />
        
        <div className={`content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/swaps" element={<Swaps />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-skill" element={<AddSkill />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      
      <Footer />
      <NotificationContainer />
    </div>
  );
}

export default App; 