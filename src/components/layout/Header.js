import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { toggleSidebar, openModal } from '../../store/slices/uiSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { sidebarOpen } = useSelector(state => state.ui);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const handleLogin = () => {
    dispatch(openModal('login'));
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <button 
              className="sidebar-toggle"
              onClick={() => dispatch(toggleSidebar())}
              aria-label="Toggle sidebar"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            
            <Link to="/" className="logo">
              <span className="logo-icon">🔄</span>
              <span className="logo-text">SkillSwap</span>
            </Link>
          </div>

          <nav className="header-nav">
            {isAuthenticated && (
              <>
                <Link to="/skills" className="nav-link">Skills</Link>
                <Link to="/swaps" className="nav-link">Swaps</Link>
                <Link to="/add-skill" className="nav-link">Add Skill</Link>
              </>
            )}
          </nav>

          <div className="header-right">
            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-info">
                  <img 
                    src={user?.avatar} 
                    alt={user?.name}
                    className="user-avatar"
                  />
                  <span className="user-name">{user?.name}</span>
                </div>
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              </div>
            ) : (
              <button onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 