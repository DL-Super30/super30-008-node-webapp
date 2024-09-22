"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLeadsApi = createAsyncThunk('getLeadsApi', async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/leads');
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const createLeadsApi = createAsyncThunk('createLeadsApi', async (payload) => {
    try {
        const response = await axios.post('http://localhost:4000/api/leads', payload);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const updateLeadsApi = createAsyncThunk('updateLeadsApi', async (payload) => {
    try {
        const response = await axios.put('http://localhost:4000/api/leads/' + payload.id, payload.itemInfo);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

const getInitialLeadsState = () => {
    return { isLoading: false, error: null, leads: [] };
  };

const leadsSlice = createSlice({
    name: 'leads',
    initialState: getInitialLeadsState(),
    extraReducers: (builder) => {
        builder
            .addCase(getLeadsApi.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(getLeadsApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return { error: null, isLoading: false, leads: action.payload.data.data };
                } else {
                    return { leads: [], isLoading: false, error: action.payload };
                }
            })
            .addCase(getLeadsApi.rejected, (state, action) => {
                return { leads: [], isLoading: false, error: action.payload };
            })
    }


});

export default leadsSlice.reducer;