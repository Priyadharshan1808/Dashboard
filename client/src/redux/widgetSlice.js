import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/categories';

// Fetch dashboard data
export const fetchDashboard = createAsyncThunk('widget/fetchDashboard', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add widget to a category
export const addWidget = createAsyncThunk('widget/addWidget', async ({ categoryId, widget }) => {
  const categoryResponse = await axios.get(`${API_URL}/${categoryId}`);
  const updatedWidgets = [...categoryResponse.data.widgets, widget];

  await axios.patch(`${API_URL}/${categoryId}`, { widgets: updatedWidgets });

  return { categoryId, widget };
});

// Delete widget from a category
export const deleteWidget = createAsyncThunk('widget/deleteWidget', async ({ categoryId, widgetName }) => {
  const categoryResponse = await axios.get(`${API_URL}/${categoryId}`);
  const updatedWidgets = categoryResponse.data.widgets.filter(widget => widget.name !== widgetName);

  await axios.patch(`${API_URL}/${categoryId}`, { widgets: updatedWidgets });

  return { categoryId, widgetName };
});

const widgetSlice = createSlice({
  name: 'widget',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addWidget.fulfilled, (state, action) => {
        const { categoryId, widget } = action.payload;
        const category = state.categories.find((c) => c.id === categoryId);
        if (category) {
          category.widgets.push(widget);
        }
      })
      .addCase(deleteWidget.fulfilled, (state, action) => {
        const { categoryId, widgetName } = action.payload;
        const category = state.categories.find((c) => c.id === categoryId);
        if (category) {
          category.widgets = category.widgets.filter((widget) => widget.name !== widgetName);
        }
      });
  },
});

export default widgetSlice.reducer;
