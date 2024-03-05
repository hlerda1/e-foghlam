import { createSlice } from '@reduxjs/toolkit';

export const actividadSlice = createSlice({
  name: 'actividad',
  initialState: {
    iLoadingActividad: true,
    actividades: [],
    activeActividad: null,
  },
  reducers: {
    onSetActiveActividad: (state, { payload }) => {
      state.activeActividad = payload;
    },
    onAddNewActividad: (state, { payload }) => {
      state.actividades.push(payload);
      state.activeActividad = null;
    },
    onUpdateActividad: (state, { payload }) => {
      state.actividades = state.actividades.map((actividad) => {
        if (actividad.id === payload.id) {
          return payload;
        }

        return actividad;
      });
    },
    onDeleteActividad: (state) => {
      if (state.activeActividad) {
        state.actividades = state.actividades.filter(
          (actividad) => actividad._id !== state.activeActividad._id
        );
        state.activeActividad = null;
      }
    },

    onLoadActividades: (state, { payload = [] }) => {
      state.iLoadingActividad = false;
      payload.forEach((actividad) => {
        const exists = state.actividades.some((dbactividad) => dbactividad._id === actividad._id);
        if (!exists) {
          state.actividades.push(actividad);
        }
      });
    },
  },
});

export const {
  onSetActiveActividad,
  onAddNewActividad,
  onUpdateActividad,
  onDeleteActividad,
  onLoadActividades,
} = actividadSlice.actions;
