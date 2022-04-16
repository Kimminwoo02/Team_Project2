import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../';

interface AuthState {
  user?: {
    email: string;
    name: string;
  };
}

const initialState: AuthState = {
  user: null,
};

export const fetchLogOut = createAsyncThunk('auth/fetchLogOut', async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  return { user: null };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }: PayloadAction<AuthState>) => {
      state.user = payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogOut.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.user = payload.user;
    });
  },
});

export const { logIn } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
