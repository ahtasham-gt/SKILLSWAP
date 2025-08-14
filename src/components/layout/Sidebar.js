import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/skills', label: 'Browse Skills', icon: '🔍' },
    { path: '/swaps', label: 'My Swaps', icon: '🤝' },
    { path: '/add-skill', label: 'Add Skill', icon: '➕' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="user-profile">
          <img 
            src={user?.avatar} 
            alt={user?.name}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h3 className="profile-name">{user?.name}</h3>
            <p className="profile-location">{user?.location}</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-number">{user?.skills?.length || 0}</span>
            <span className="stat-label">Skills</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">Swaps</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 