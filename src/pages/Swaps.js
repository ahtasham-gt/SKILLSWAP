import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSwaps, setFilters } from '../store/slices/swapsSlice';
import SwapCard from '../components/swaps/SwapCard';
import './Swaps.css';

const Swaps = () => {
  const dispatch = useDispatch();
  const { swaps, filters, loading } = useSelector(state => state.swaps);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchSwaps());
  }, [dispatch]);

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const filteredSwaps = swaps.filter(swap => {
    const matchesStatus = !filters.status || swap.status === filters.status;
    const matchesType = filters.type === 'all' || 
      (filters.type === 'sent' && swap.requesterId === user?.id) ||
      (filters.type === 'received' && swap.providerId === user?.id);
    
    return matchesStatus && matchesType;
  });

  const getSwapType = (swap) => {
    if (swap.requesterId === user?.id) return 'sent';
    if (swap.providerId === user?.id) return 'received';
    return 'other';
  };

  const stats = {
    total: swaps.length,
    pending: swaps.filter(s => s.status === 'pending').length,
    accepted: swaps.filter(s => s.status === 'accepted').length,
    sent: swaps.filter(s => s.requesterId === user?.id).length,
    received: swaps.filter(s => s.providerId === user?.id).length
  };

  return (
    <div className="swaps-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">My Swaps</h1>
            <p className="page-subtitle">
              Manage your skill swap requests and connections
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Swaps</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-value">{stats.accepted}</div>
                <div className="stat-label">Accepted</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📤</div>
              <div className="stat-content">
                <div className="stat-value">{stats.sent}</div>
                <div className="stat-label">Sent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Swaps</option>
                <option value="sent">Sent Requests</option>
                <option value="received">Received Requests</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="filter-select"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              {loading ? 'Loading...' : `${filteredSwaps.length} swaps found`}
            </h2>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading swaps...</p>
            </div>
          ) : filteredSwaps.length > 0 ? (
            <div className="swaps-list">
              {filteredSwaps.map(swap => (
                <SwapCard key={swap.id} swap={swap} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🤝</div>
              <h3>No swaps found</h3>
              <p>
                {filters.type !== 'all' || filters.status 
                  ? 'Try adjusting your filters to see more swaps.'
                  : 'Start connecting with others to see your swaps here!'
                }
              </p>
              <a href="/skills" className="btn btn-primary">
                Browse Skills
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Swaps; 