import { createSlice } from '@reduxjs/toolkit';

export const comisionSlice = createSlice({
  name: 'comision',
  initialState: {
    iLoadingComision: true,
    comisiones: [],
    activeComision: null,
  },
  reducers: {
    onSetActiveComision: (state, { payload }) => {
      state.activeComision = payload;
    },
    onAddNewComision: (state, { payload }) => {
      state.comisiones.push(payload);
      state.activeComision = null;
    },
    onUpdateComision: (state, { payload }) => {
      state.comisiones = state.comisiones.map((comision) => {
        if (comision.id === payload.id) {
          return payload;
        }

        return comision;
      });
    },
    onDeleteComision: (state) => {
      if (state.activeComision) {
        state.comisiones = state.comisiones.filter(
          (comision) => comision._id !== state.activeComision._id
        );
        state.activeComision = null;
      }
    },

    onLoadComisiones: (state, { payload = [] }) => {
      state.iLoadingComision = false;
      payload.forEach((comision) => {
        const exists = state.comisiones.some((dbcomision) => dbcomision._id === comision._id);
        if (!exists) {
          state.comisiones.push(comision);
        }
      });
    },
  },
});

export const {
  onSetActiveComision,
  onAddNewComision,
  onUpdateComision,
  onDeleteComision,
  onLoadComisiones,
} = comisionSlice.actions;
