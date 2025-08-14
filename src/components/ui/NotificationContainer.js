import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../store/slices/uiSlice';
import './NotificationContainer.css';

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.ui.notifications);

  useEffect(() => {
    notifications.forEach(notification => {
      const timer = setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [notifications, dispatch]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case 'success':
        return 'notification-success';
      case 'error':
        return 'notification-error';
      case 'warning':
        return 'notification-warning';
      case 'info':
        return 'notification-info';
      default:
        return 'notification-info';
    }
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification ${getNotificationClass(notification.type)}`}
        >
          <div className="notification-icon">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="notification-content">
            <h4 className="notification-title">{notification.title}</h4>
            <p className="notification-message">{notification.message}</p>
          </div>
          <button
            className="notification-close"
            onClick={() => dispatch(removeNotification(notification.id))}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer; 