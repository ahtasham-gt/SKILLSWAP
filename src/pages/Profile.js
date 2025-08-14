import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/authSlice';
import { addNotification } from '../store/slices/uiSlice';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(updateProfile(formData)).unwrap();
      dispatch(addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully!'
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update profile. Please try again.'
      }));
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Profile</h1>
            <p className="page-subtitle">
              Manage your profile information and settings
            </p>
          </div>
        </div>

        <div className="profile-content">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-header">
              <img 
                src={user?.avatar} 
                alt={user?.name}
                className="profile-avatar"
              />
              <div className="profile-info">
                <h2 className="profile-name">{user?.name}</h2>
                <p className="profile-email">{user?.email}</p>
                <p className="profile-location">{user?.location}</p>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{user?.skills?.length || 0}</span>
                <span className="stat-label">Skills</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Swaps</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8</span>
                <span className="stat-label">Connections</span>
              </div>
            </div>
          </div>

          {}
          <div className="edit-form-card">
            <h3 className="form-title">Edit Profile</h3>
            
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your name"
                  disabled={loading}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  disabled={loading}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your location"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio" className="form-label">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="form-input form-textarea"
                  placeholder="Tell us about yourself..."
                  rows="4"
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary save-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          </div>

          {}
          <div className="skills-section">
            <h3 className="section-title">Your Skills</h3>
            {user?.skills && user.skills.length > 0 ? (
              <div className="skills-list">
                {user.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-name">{skill}</span>
                    <span className="skill-level">Expert</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-skills">
                <p>No skills added yet.</p>
                <a href="/add-skill" className="btn btn-outline">
                  Add Your First Skill
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 