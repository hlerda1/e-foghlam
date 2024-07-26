import { createSlice } from '@reduxjs/toolkit';

export const calificacionSlice = createSlice({
  name: 'calificacion',
  initialState: {
    isLoadingCalificacion: true,
    calificaciones: [],
    activeCalificacion: null,
  },
  reducers: {
    onSetActiveCalificacion: (state, { payload }) => {
      state.activeCalificacion = payload;
    },
    onAddNewCalificacion: (state, { payload }) => {
      state.calificaciones.push(payload);
      state.activeCalificacion = null;
    },
    onUpdateCalificacion: (state, { payload }) => {
      state.calificaciones = state.calificaciones.map(calificacion =>
        calificacion._id === payload._id ? payload : calificacion
      );
    },
    onDeleteCalificacion: (state, { payload }) => {
      state.calificaciones = state.calificaciones.filter(calificacion => calificacion._id !== payload);
    },

    onLoadCalificacion: (state, { payload = [] }) => {
      state.isLoadingCalificacion = false;
      payload.forEach((calificacion) => {
        const exists = state.calificaciones.some((dbcalificacion) => dbcalificacion._id === calificacion._id);
        if (!exists) {
          state.calificaciones.push(calificacion);
        }
      });
    },
  },
});

export const {
    onSetActiveCalificacion,
    onAddNewCalificacion,
    onUpdateCalificacion,
    onDeleteCalificacion,
    onLoadCalificacion,
} = calificacionSlice.actions;
  