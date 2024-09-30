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

export const getTodayLeadsApi = createAsyncThunk('getTodayLeadsApi', async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/leadstatus/todayLeadsOnHourly');
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

export const deleteLeadsApi = createAsyncThunk('deleteLeadsApi', async (id) => {
    try {
        const response = await axios.delete('http://localhost:4000/api/leads/' + id);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const convertLeadsApi = createAsyncThunk('convertLeadsApi', async (id) => {
    try {
        const response = await axios.post('http://localhost:4000/api/leads/' + id + '/convert', {});
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
    return { isLoading: false, error: null, leads: [], newItem: {}, deleteItem: {}, todayLeads: [] };
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

                    return { ...state, error: null, isLoading: false, leads: action.payload.data.data };
                } else {
                    return { ...state, leads: [], isLoading: false, error: action.payload };
                }
            })
            .addCase(getLeadsApi.rejected, (state, action) => {
                return { ...state, leads: [], isLoading: false, error: action.payload };
            })

            .addCase(createLeadsApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return {...state,newItem: action.payload.data.data, isLoading: false};
                } else {
                    return { ...state, error: action.payload, isLoading: false};
                }
            })
            .addCase(deleteLeadsApi.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(deleteLeadsApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return {...state, deleteItem: action.payload.data?.data, isLoading: false};
                } else {
                    return { ...state, error: action.payload, isLoading: false};
                }
            })
            .addCase(getTodayLeadsApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return {...state, todayLeads: action.payload.data?.data, isLoading: false};
                } else {
                    return { ...state, error: action.payload, isLoading: false};
                }
            })
            
    }



});

export default leadsSlice.reducer;