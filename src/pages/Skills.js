import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSkills, setFilters, clearFilters } from '../store/slices/skillsSlice';
import SkillCard from '../components/skills/SkillCard';
import './Skills.css';

const Skills = () => {
  const dispatch = useDispatch();
  const { skills, categories, levels, filters, loading } = useSelector(state => state.skills);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setFilters({ search: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSearchTerm('');
  };

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = !filters.search || 
      skill.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      skill.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      skill.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesCategory = !filters.category || skill.category === filters.category;
    const matchesLevel = !filters.level || skill.level === filters.level;
    const matchesLocation = !filters.location || 
      skill.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesCategory && matchesLevel && matchesLocation;
  });

  const hasActiveFilters = filters.category || filters.level || filters.location || filters.search;

  return (
    <div className="skills-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">Browse Skills</h1>
            <p className="page-subtitle">
              Discover skills from people around the world and start learning together
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            {/* Search */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search skills, tags, or descriptions..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="filter-group">
              <label className="filter-label">Level</label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="filter-select"
              >
                <option value="">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="filter-group">
              <label className="filter-label">Location</label>
              <input
                type="text"
                placeholder="Enter location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="filters-actions">
              <button onClick={handleClearFilters} className="btn btn-outline btn-sm">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              {loading ? 'Loading...' : `${filteredSkills.length} skills found`}
            </h2>
            {hasActiveFilters && (
              <div className="active-filters">
                {filters.category && (
                  <span className="filter-tag">
                    Category: {filters.category}
                  </span>
                )}
                {filters.level && (
                  <span className="filter-tag">
                    Level: {filters.level}
                  </span>
                )}
                {filters.location && (
                  <span className="filter-tag">
                    Location: {filters.location}
                  </span>
                )}
                {filters.search && (
                  <span className="filter-tag">
                    Search: "{filters.search}"
                  </span>
                )}
              </div>
            )}
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading skills...</p>
            </div>
          ) : filteredSkills.length > 0 ? (
            <div className="skills-grid">
              {filteredSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No skills found</h3>
              <p>
                {hasActiveFilters 
                  ? 'Try adjusting your filters or search terms.'
                  : 'No skills have been added yet. Be the first to add a skill!'
                }
              </p>
              {hasActiveFilters && (
                <button onClick={handleClearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills; 