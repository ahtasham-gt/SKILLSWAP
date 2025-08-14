import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSkills } from '../store/slices/skillsSlice';
import { fetchSwaps } from '../store/slices/swapsSlice';
import SkillCard from '../components/skills/SkillCard';
import SwapCard from '../components/swaps/SwapCard';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { skills, loading: skillsLoading } = useSelector(state => state.skills);
  const { swaps, loading: swapsLoading } = useSelector(state => state.swaps);

  useEffect(() => {
    dispatch(fetchSkills());
    dispatch(fetchSwaps());
  }, [dispatch]);

  const recentSkills = skills.slice(0, 3);
  const recentSwaps = swaps.slice(0, 2);

  const stats = [
    { label: 'Total Skills', value: skills.length, icon: '🔍' },
    { label: 'Active Swaps', value: swaps.filter(s => s.status === 'accepted').length, icon: '🤝' },
    { label: 'Pending Requests', value: swaps.filter(s => s.status === 'pending').length, icon: '⏳' },
    { label: 'Your Skills', value: user?.skills?.length || 0, icon: '⭐' }
  ];

  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome back, <span className="highlight">{user?.name}</span>! 👋
            </h1>
            <p className="hero-subtitle">
              Ready to learn something new or share your expertise? 
              Connect with others and start swapping skills today.
            </p>
            <div className="hero-actions">
              <Link to="/add-skill" className="btn btn-primary">
                Add Your Skill
              </Link>
              <Link to="/skills" className="btn btn-outline">
                Browse Skills
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <span className="hero-icon">🔄</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <div className="content-grid">
          {/* Recent Skills */}
          <section className="recent-section">
            <div className="section-header">
              <h2 className="section-title">Recent Skills</h2>
              <Link to="/skills" className="view-all">View All</Link>
            </div>
            {skillsLoading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="skills-grid">
                {recentSkills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            )}
          </section>

          {/* Recent Swaps */}
          <section className="recent-section">
            <div className="section-header">
              <h2 className="section-title">Recent Swaps</h2>
              <Link to="/swaps" className="view-all">View All</Link>
            </div>
            {swapsLoading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="swaps-list">
                {recentSwaps.length > 0 ? (
                  recentSwaps.map(swap => (
                    <SwapCard key={swap.id} swap={swap} />
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🤝</div>
                    <h3>No swaps yet</h3>
                    <p>Start connecting with others to see your swaps here!</p>
                    <Link to="/skills" className="btn btn-primary">
                      Browse Skills
                    </Link>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/add-skill" className="action-card">
              <div className="action-icon">➕</div>
              <h3>Add Skill</h3>
              <p>Share your expertise with the community</p>
            </Link>
            <Link to="/skills" className="action-card">
              <div className="action-icon">🔍</div>
              <h3>Find Skills</h3>
              <p>Discover skills you want to learn</p>
            </Link>
            <Link to="/swaps" className="action-card">
              <div className="action-icon">🤝</div>
              <h3>My Swaps</h3>
              <p>Manage your skill swap requests</p>
            </Link>
            <Link to="/profile" className="action-card">
              <div className="action-icon">👤</div>
              <h3>Update Profile</h3>
              <p>Keep your profile information current</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home; 