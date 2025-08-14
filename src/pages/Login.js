import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';
import { closeModal } from '../store/slices/uiSlice';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  const { modals } = useSelector(state => state.ui);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await dispatch(loginUser(formData)).unwrap();
      if (modals.login) {
        dispatch(closeModal('login'));
      }
    } catch (error) {
      
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@skillswap.com',
      password: 'demo123'
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <span className="logo-icon">🔄</span>
              <h1 className="logo-text">SkillSwap</h1>
            </div>
            <p className="login-subtitle">
              Connect, learn, and share skills with people around the world
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
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
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
                disabled={loading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {error && (
              <div className="error-banner">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <button 
              type="button" 
              className="btn btn-outline demo-btn"
              onClick={handleDemoLogin}
              disabled={loading}
            >
              Try Demo Account
            </button>
          </form>

          <div className="login-footer">
            <p className="footer-text">
              Don't have an account?{' '}
              <button 
                className="link-button"
                onClick={() => dispatch(closeModal('login'))}
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 