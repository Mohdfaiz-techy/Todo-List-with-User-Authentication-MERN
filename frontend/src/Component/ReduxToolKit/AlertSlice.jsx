import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  alertType: '',
  visible: false,
};

// Thunk for showing alert with a delay
export const showAlertWithTimeout = createAsyncThunk(
  'alert/showAlertWithTimeout',
  async ({ message, alertType }, { dispatch }) => {
    dispatch(showAlert({ message, alertType }));
    setTimeout(() => {
      dispatch(hideAlert());
    }, 1500);
  }
);

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload.message;
      state.alertType = action.payload.alertType;
      state.visible = true;
    },
    hideAlert: (state) => {
      state.message = '';
      state.alertType = '';
      state.visible = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
