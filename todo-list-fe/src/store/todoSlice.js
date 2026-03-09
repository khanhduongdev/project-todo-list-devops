import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchTodos = createAsyncThunk('todos/fetchAll', async (params) => {
  const response = await api.get('/todos', { params });
  return response.data;
});

export const addTodo = createAsyncThunk('todos/add', async (todo) => {
  const response = await api.post('/todos', todo);
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/update', async ({ id, todo }) => {
  const response = await api.put(`/todos/${id}`, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/delete', async (id) => {
  await api.delete(`/todos/${id}`);
  return id;
});

export const bulkDelete = createAsyncThunk('todos/bulkDelete', async (ids) => {
  await api.post('/todos/bulk-delete', ids);
  return ids;
});

export const bulkComplete = createAsyncThunk('todos/bulkComplete', async (ids) => {
  await api.post('/todos/bulk-complete', ids);
  return ids;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: {
      completed: null,
      priority: null,
      search: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => { state.loading = true; })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addCase(bulkDelete.fulfilled, (state, action) => {
        state.items = state.items.filter(t => !action.payload.includes(t.id));
      })
      .addCase(bulkComplete.fulfilled, (state, action) => {
        state.items.forEach(t => {
          if (action.payload.includes(t.id)) t.completed = true;
        });
      });
  }
});

export const { setFilters } = todoSlice.actions;
export default todoSlice.reducer;
