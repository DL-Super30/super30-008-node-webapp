// redux/slices/modalSlice.js
"use client"
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    selectedLead: null, // to store the lead to be updated
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedLead = action.payload; // store selected lead data
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedLead = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
