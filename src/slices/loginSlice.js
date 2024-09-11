"use client";
import { createSlice } from '@reduxjs/toolkit';

const getInitialLoginState = () => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = localStorage.getItem('userData');
      return { isLoggedIn, userData: userData ? JSON.parse(userData) : null };
    }
    return { isLoggedIn: false, userData: null };
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
        }

    },


});

export const { loginApi, checkLoginStatus } = loginSlice.actions;
export default loginSlice.reducer;