"use client"
import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from '../components/leadsSlice';
import modalReducer from '../components/modalSlice';

const store = configureStore({
  reducer: {
    leads: leadsReducer,
    modal: modalReducer,
  }
});

export default store;
