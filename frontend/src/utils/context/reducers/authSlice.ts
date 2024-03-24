import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserData | null;
  token: string | null;
}

interface UserData {
  id: number;
  username: string;
  email: string;
}

const userInitialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState:userInitialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: UserData}>) => {
      state.user = action.payload.user;
      // state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;


