"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCourseApi = createAsyncThunk('getCourseApi', async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/course');
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const createCourseApi = createAsyncThunk('createCourseApi', async (payload) => {
    try {
        const response = await axios.post('http://localhost:4000/api/course', payload);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const updateCourseApi = createAsyncThunk('updateCourseApi', async (payload) => {
    try {
        const response = await axios.put('http://localhost:4000/api/course/' + payload.id, payload.itemInfo);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

export const deleteCourseApi = createAsyncThunk('deleteCourseApi', async (id) => {
    try {
        const response = await axios.delete('http://localhost:4000/api/course/' + id);
        return response;
    } catch(error) {
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

const getInitialCoursesState = () => {
    return { isLoading: false, error: null, courses: [], newItem: {}, deleteIte: {} };
  };

const coursesSlice = createSlice({
    name: 'courses',
    initialState: getInitialCoursesState(),
    extraReducers: (builder) => {
        builder
            .addCase(getCourseApi.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(getCourseApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return { error: null, isLoading: false, courses: action.payload.data };
                } else {
                    return { courses: [], isLoading: false, error: action.payload };
                }
            })
            .addCase(getCourseApi.rejected, (state, action) => {
                return { courses: [], isLoading: false, error: action.payload };
            })

            .addCase(createCourseApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return {...state,newItem: action.payload.data, isLoading: false};
                } else {
                    return { ...state, error: action.payload, isLoading: false };
                }
            })  
            
            .addCase(deleteCourseApi.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(deleteCourseApi.fulfilled, (state, action) => {
                if (action.payload.status === 200 || action.payload.status === 201) {

                    return {...state, deleteItem: action.payload.data, isloading: false};
                } else {
                    return { ...state, error: action.payload, isLoading: false};
                }
            })
    }


});

export default coursesSlice.reducer;