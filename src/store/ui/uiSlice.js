import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false,
    isActModalOpen: false,
    isComModalOpen: false,
  },

  // acciones(reducers)
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
    onOpenActModal: (state) => {
      state.isActModalOpen = true;
    },
    onCloseActModal: (state) => {
      state.isActModalOpen = false;
    },
    onOpenComModal: (state) => {
      state.isComModalOpen = true;
    },
    onCloseComModal: (state) => {
      state.isComModalOpen = false;
    },
  },
});

export const { 
  onOpenDateModal, 
  onCloseDateModal, 
  onOpenActModal, 
  onCloseActModal, 
  onOpenComModal, 
  onCloseComModal 
} = uiSlice.actions;

export default uiSlice.reducer;
