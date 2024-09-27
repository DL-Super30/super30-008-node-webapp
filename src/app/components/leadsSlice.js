"use client"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to update lead data
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const updateLead = createAsyncThunk(
  'leads/updateLead',
  async (updatedLead, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/leads/`, updatedLead);
      return response.data;  // Returning the updated lead data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setLeads(state, action) {
      state.leads = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.leads.findIndex((lead) => lead.id === action.payload.id);
        if (index !== -1) {
          state.leads[index] = action.payload;  // Updating the lead in the state
        }
      });
  }
});

export const { setLeads } = leadsSlice.actions;
export default leadsSlice.reducer;
