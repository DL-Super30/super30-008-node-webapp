"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOpportunityApi = createAsyncThunk('getOpportunityApi', async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/opportunity');
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const createOpportunityApi = createAsyncThunk('createOpportunityApi', async (payload) => {
    try {
        const response = await axios.post('http://localhost:4000/api/opportunity', payload);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const updateOpportunityApi = createAsyncThunk('updateOpportunityApi', async (payload) => {
    try {
        const response = await axios.put('http://localhost:4000/api/opportunity/' + payload.id, payload.itemInfo);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

const getInitialOpportunitiesState = () => {
    return { isLoading: false, error: null, opportunities: [], newItem: {} };
  };

const opportunitiesSlice = createSlice({
    name: 'opportunities',
    initialState: getInitialOpportunitiesState(),
    extraReducers: (builder) => {
        builder
            .addCase(getOpportunityApi.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(getOpportunityApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return { error: null, isLoading: false, opportunities: action.payload.data.data };
                } else {
                    return { opportunities: [], isLoading: false, error: action.payload };
                }
            })
            .addCase(getOpportunityApi.rejected, (state, action) => {
                return { opportunities: [], isLoading: false, error: action.payload };
            })

            .addCase(createOpportunityApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return {...state, newItem: action.payload.data.data};
                } else {
                    return { ...state, error: action.payload, };
                }
            })
    }


});

export default opportunitiesSlice.reducer;