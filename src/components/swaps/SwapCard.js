import React from 'react';
import { useSelector } from 'react-redux';
import './SwapCard.css';

const SwapCard = ({ swap }) => {
  const { user } = useSelector(state => state.auth);
  const isRequester = swap.requesterId === user?.id;

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'status-accepted';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  return (
    <div className="swap-card">
      <div className="swap-header">
        <div className="swap-users">
          <div className="user-pair">
            <img 
              src={swap.requesterAvatar} 
              alt={swap.requesterName}
              className="user-avatar"
            />
            <span className="swap-arrow">→</span>
            <img 
              src={swap.providerAvatar} 
              alt={swap.providerName}
              className="user-avatar"
            />
          </div>
          <div className="swap-names">
            <span className="user-name">{swap.requesterName}</span>
            <span className="swap-arrow-text">swaps with</span>
            <span className="user-name">{swap.providerName}</span>
          </div>
        </div>
        <div className={`swap-status ${getStatusColor(swap.status)}`}>
          {getStatusText(swap.status)}
        </div>
      </div>

      <div className="swap-content">
        <h4 className="swap-skill">{swap.skillTitle}</h4>
        <p className="swap-message">{swap.message}</p>
      </div>

      <div className="swap-footer">
        <div className="swap-meta">
          <span className="swap-date">
            {new Date(swap.createdAt).toLocaleDateString()}
          </span>
          {swap.status === 'accepted' && (
            <span className="swap-updated">
              Updated: {new Date(swap.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
        
        {swap.status === 'pending' && !isRequester && (
          <div className="swap-actions">
            <button className="btn btn-secondary btn-sm">Accept</button>
            <button className="btn btn-outline btn-sm">Decline</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapCard; 