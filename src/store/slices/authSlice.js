import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    status: 'checking',
    user: {},
    errorMessage: undefined,
  },
  //reducers, se crean los metodos que modifican o mutan el inicial state
  reducers: {
    // reducers
    onChecking: (state) => {
      (state.status = 'checking'),
        (state.user = {}),
        (state.errorMessage = undefined);
    },
    onLogin: (state, { payload }) => {
      (state.status = 'authenticated'),
        (state.user = payload),
        (state.errorMessage = undefined);
    },
    onLogout: (state, { payload }) => {
      (state.status = 'not-authenticated'),
        (state.user = {}),
        (state.errorMessage = payload);
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Acciones(metodos), aca se crean
export const { onLogin, onLogout, onChecking, clearErrorMessage } =
  authSlice.actions;

export default authSlice.reducer;
