"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUserApi = createAsyncThunk('loginUserApi', async (payload) => {
    try {
        const response = await axios.post('http://localhost:8000/login', payload);
        console.log(response.status);
        return response;
    } catch(error) {
        console.log(error)
        if (error.response) {
            return error.response;
        } else {
            return error.message;
        }
    }
});

const getInitialLoginState = () => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = localStorage.getItem('userData');
      return { isLoggedIn, isLoading: false, error: null, userData: userData ? JSON.parse(userData) : null };
    }
    return { isLoggedIn: false, isLoading: false, error: null, userData: null };
  };

const loginSlice = createSlice({
    name: 'login',
    initialState: getInitialLoginState(),
    

    reducers: {
        loginApi: (state, action) => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify(action.payload));
            
            state.isLoggedIn = true;
            state.userData = action.payload;
        },

    checkLoginStatus: (state, action) => {
        if (typeof window !== 'undefined') {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userData = localStorage.getItem('userData');
            state.isLoggedIn = isLoggedIn;
            state.userData = userData ? JSON.parse(userData) : null;
        } else {
            state.isLoggedIn = false;
            state.userData = null;
        }
        },

logout: (state, action)=> {
    localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('userData', null);
            
            state.isLoggedIn = false;
            state.userData = null;
}

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUserApi.pending, (state, action) => {
                return { ...state, isLoading: true };
            })
            .addCase(loginUserApi.fulfilled, (state, action) => {
                if (action.payload.status === 200) {

                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userData', JSON.stringify(action.payload))

                    return { error: null, isLoggedIn: true, isLoading: false, data: action.payload.message };
                } else {
                    return { data: null, isLoggedIn: false, isLoading: false, error: action.payload.message };
                }
            })
            .addCase(loginUserApi.rejected, (state, action) => {
                return { data: null, isLoggedIn: false, isLoading: false, error: action.payload };
            })
    }


});

export const { loginApi, checkLoginStatus, logout } = loginSlice.actions;
export default loginSlice.reducer;