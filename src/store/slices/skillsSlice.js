import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchSkills = createAsyncThunk(
  'skills/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock skills data
      return [
        {
          id: '1',
          title: 'JavaScript Development',
          category: 'Programming',
          description: 'Expert in modern JavaScript, ES6+, and frontend frameworks',
          level: 'Expert',
          userId: '1',
          user: {
            name: 'John Doe',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff'
          },
          tags: ['JavaScript', 'ES6', 'React', 'Node.js'],
          location: 'New York, NY',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          title: 'UI/UX Design',
          category: 'Design',
          description: 'Creating beautiful and intuitive user interfaces with Figma and Adobe Creative Suite',
          level: 'Intermediate',
          userId: '2',
          user: {
            name: 'Sarah Wilson',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=10b981&color=fff'
          },
          tags: ['Figma', 'Adobe', 'UI/UX', 'Prototyping'],
          location: 'San Francisco, CA',
          createdAt: '2024-01-10'
        },
        {
          id: '3',
          title: 'Python Data Science',
          category: 'Data Science',
          description: 'Data analysis, machine learning, and statistical modeling with Python',
          level: 'Expert',
          userId: '3',
          user: {
            name: 'Mike Chen',
            avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=f59e0b&color=fff'
          },
          tags: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
          location: 'Austin, TX',
          createdAt: '2024-01-12'
        },
        {
          id: '4',
          title: 'Digital Marketing',
          category: 'Marketing',
          description: 'SEO, social media marketing, and content strategy',
          level: 'Intermediate',
          userId: '4',
          user: {
            name: 'Emily Rodriguez',
            avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=8b5cf6&color=fff'
          },
          tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
          location: 'Miami, FL',
          createdAt: '2024-01-08'
        }
      ];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSkill = createAsyncThunk(
  'skills/addSkill',
  async (skillData, { getState }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = getState().auth.user;
      const newSkill = {
        id: Date.now().toString(),
        ...skillData,
        userId: user.id,
        user: {
          name: user.name,
          avatar: user.avatar
        },
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      return newSkill;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  skills: [],
  categories: [
    'Programming',
    'Design',
    'Data Science',
    'Marketing',
    'Business',
    'Language',
    'Music',
    'Cooking',
    'Fitness',
    'Other'
  ],
  levels: ['Beginner', 'Intermediate', 'Expert'],
  loading: false,
  error: null,
  filters: {
    category: '',
    level: '',
    location: '',
    search: ''
  }
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        level: '',
        location: '',
        search: ''
      };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Skills
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Skill
      .addCase(addSkill.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.loading = false;
        state.skills.unshift(action.payload);
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters, clearError } = skillsSlice.actions;
export default skillsSlice.reducer; 