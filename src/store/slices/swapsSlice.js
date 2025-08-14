import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchSwaps = createAsyncThunk(
  'swaps/fetchSwaps',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const currentUser = getState().auth.user;
      
      // Mock swaps data
      return [
        {
          id: '1',
          skillId: '2',
          skillTitle: 'UI/UX Design',
          requesterId: currentUser.id,
          requesterName: currentUser.name,
          requesterAvatar: currentUser.avatar,
          providerId: '2',
          providerName: 'Sarah Wilson',
          providerAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=10b981&color=fff',
          status: 'pending',
          message: 'I can teach you JavaScript in exchange for UI/UX design lessons!',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          skillId: '3',
          skillTitle: 'Python Data Science',
          requesterId: '3',
          requesterName: 'Mike Chen',
          requesterAvatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=f59e0b&color=fff',
          providerId: currentUser.id,
          providerName: currentUser.name,
          providerAvatar: currentUser.avatar,
          status: 'accepted',
          message: 'I would love to learn React from you!',
          createdAt: '2024-01-14T15:20:00Z',
          updatedAt: '2024-01-14T16:45:00Z'
        }
      ];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSwapRequest = createAsyncThunk(
  'swaps/createSwapRequest',
  async (swapData, { getState }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentUser = getState().auth.user;
      const newSwap = {
        id: Date.now().toString(),
        ...swapData,
        requesterId: currentUser.id,
        requesterName: currentUser.name,
        requesterAvatar: currentUser.avatar,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return newSwap;
    } catch (error) {
      throw error;
    }
  }
);

export const updateSwapStatus = createAsyncThunk(
  'swaps/updateSwapStatus',
  async ({ swapId, status }, { getState }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { swapId, status, updatedAt: new Date().toISOString() };
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  swaps: [],
  loading: false,
  error: null,
  filters: {
    status: '',
    type: 'all' // 'sent', 'received', 'all'
  }
};

const swapsSlice = createSlice({
  name: 'swaps',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    addMessage: (state, action) => {
      const { swapId, message } = action.payload;
      const swap = state.swaps.find(s => s.id === swapId);
      if (swap) {
        if (!swap.messages) swap.messages = [];
        swap.messages.push({
          id: Date.now().toString(),
          message,
          senderId: action.payload.senderId,
          createdAt: new Date().toISOString()
        });
        swap.updatedAt = new Date().toISOString();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Swaps
      .addCase(fetchSwaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSwaps.fulfilled, (state, action) => {
        state.loading = false;
        state.swaps = action.payload;
      })
      .addCase(fetchSwaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Swap Request
      .addCase(createSwapRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSwapRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.swaps.unshift(action.payload);
      })
      .addCase(createSwapRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Swap Status
      .addCase(updateSwapStatus.fulfilled, (state, action) => {
        const swap = state.swaps.find(s => s.id === action.payload.swapId);
        if (swap) {
          swap.status = action.payload.status;
          swap.updatedAt = action.payload.updatedAt;
        }
      });
  },
});

export const { setFilters, clearError, addMessage } = swapsSlice.actions;
export default swapsSlice.reducer; 