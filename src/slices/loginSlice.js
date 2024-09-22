"use client";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUserApi = createAsyncThunk('loginUserApi', async (payload) => {
    try {
        const response = await axios.post('http://localhost:4000/api/users/login', payload);
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
            localStorage.setItem('accessToken', null);
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
                if (action.payload.status === 200 || action.payload.status === 201) {
                    console.log(action.payload);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userData', JSON.stringify(action.payload.data));
                    localStorage.setItem('accessToken', action.payload.data.token);

                    return { error: null, isLoggedIn: true, isLoading: false, data: action.payload.data };
                } else {
                    return { data: null, isLoggedIn: false, isLoading: false, error: action.payload };
                }
            })
            .addCase(loginUserApi.rejected, (state, action) => {
                return { data: null, isLoggedIn: false, isLoading: false, error: action.payload };
            })
    }


});

export const { loginApi, checkLoginStatus, logout } = loginSlice.actions;
export default loginSlice.reducer;