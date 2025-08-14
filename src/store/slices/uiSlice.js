import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  modals: {
    login: false,
    addSkill: false,
    swapRequest: false,
    profile: false
  },
  notifications: [],
  theme: 'light',
  loading: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      const modalName = action.payload;
      state.modals[modalName] = true;
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      state.modals[modalName] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false;
      });
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: new Date().toISOString()
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  removeNotification,
  clearNotifications,
  toggleTheme,
  setLoading
} = uiSlice.actions;

export default uiSlice.reducer; 