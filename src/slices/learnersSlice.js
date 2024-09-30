"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getlearnerApi = createAsyncThunk('getLearnerApi', async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/learner');
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const createLearnerApi = createAsyncThunk('createLearnerApi', async (payload) => {
    try {
        const response = await axios.post('http://localhost:4000/api/learner', payload);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const updatelearnerApi = createAsyncThunk('updatelearnerApi', async (payload) => {
    try {
        const response = await axios.put('http://localhost:4000/api/learner' + payload.id, payload.itemInfo);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const deleteLearnerApi = createAsyncThunk('deleteLearnerApi', async (id) => {
    try {
        const response = await axios.delete('http://localhost:4000/api/learner/' + id);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

const getInitialLearnersState = () => {
    return { isLoading: false, error: null, learners: [], newItem: {}, deleteIte: {} };
  };

const learnersSlice = createSlice({
    name: 'learners',
    initialState: getInitialLearnersState(),
    extraReducers: (builder) => {
        builder
            .addCase(getlearnerApi.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(getlearnerApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return { error: null, isLoading: false, learners: action.payload.data.data };
                } else {
                    return { learners: [], isLoading: false, error: action.payload };
                }
            })
            .addCase(getlearnerApi.rejected, (state, action) => {
                return { learners: [], isLoading: false, error: action.payload };
            })

            .addCase(createLearnerApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return {...state,newItem: action.payload.data.data, isLoading: false};
                } else {
                    return { ...state, error: action.payload, isLoading: false };
                }
            })  
            
            .addCase(deleteLearnerApi.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(deleteLearnerApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return {...state, deleteItem: action.payload.data.data, isloading: false};
                } else {
                    return { ...state, error: action.payload, isLoading: false};
                }
            })
    }


});

export default learnersSlice.reducer;