import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSkill } from '../store/slices/skillsSlice';
import { addNotification } from '../store/slices/uiSlice';
import './AddSkill.css';

const AddSkill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, levels, loading } = useSelector(state => state.skills);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: '',
    description: '',
    location: '',
    tags: ''
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

    if (!formData.title.trim()) {
      newErrors.title = 'Skill title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.level) {
      newErrors.level = 'Level is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
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
      const skillData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      await dispatch(addSkill(skillData)).unwrap();
      
      dispatch(addNotification({
        type: 'success',
        title: 'Skill Added!',
        message: 'Your skill has been added successfully.'
      }));

      navigate('/skills');
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        title: 'Failed to Add Skill',
        message: 'Please try again.'
      }));
    }
  };

  return (
    <div className="add-skill-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Add Your Skill</h1>
            <p className="page-subtitle">
              Share your expertise with the community and start connecting with learners
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="form-container">
          <div className="form-card">
            <form onSubmit={handleSubmit} className="add-skill-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Skill Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    placeholder="e.g., JavaScript Development, UI/UX Design"
                    disabled={loading}
                  />
                  {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="category" className="form-label">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`form-input ${errors.category ? 'error' : ''}`}
                    disabled={loading}
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && <span className="error-message">{errors.category}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="level" className="form-label">Skill Level *</label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className={`form-input ${errors.level ? 'error' : ''}`}
                    disabled={loading}
                  >
                    <option value="">Select your level</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.level && <span className="error-message">{errors.level}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="form-label">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`form-input ${errors.location ? 'error' : ''}`}
                    placeholder="e.g., New York, NY"
                    disabled={loading}
                  />
                  {errors.location && <span className="error-message">{errors.location}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
                  placeholder="Describe your skill, experience, and what you can teach..."
                  rows="4"
                  disabled={loading}
                />
                {errors.description && <span className="error-message">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., JavaScript, React, Node.js (comma separated)"
                  disabled={loading}
                />
                <small className="form-help">Separate tags with commas</small>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Adding Skill...
                    </>
                  ) : (
                    'Add Skill'
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-outline cancel-btn"
                  onClick={() => navigate('/skills')}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkill; 