import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false,
    isActModalOpen: false,
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
  },
});

export const { onOpenDateModal, onCloseDateModal, onOpenActModal, onCloseActModal } = uiSlice.actions;

export default uiSlice.reducer;
