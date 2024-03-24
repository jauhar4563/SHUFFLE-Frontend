import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminAuthState {
  admin: AdminData | null;
  token: string | null;

}

interface AdminData {
  id: number;
  username: string;
  email: string;
}

const AdminInitialState: AdminAuthState = {
  admin: null,
  token: null,

};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState:AdminInitialState,
  reducers: {
    AdminLoginSuccess: (state, action: PayloadAction<{admin: AdminData }>) => {
      state.admin = action.payload.admin;
 
    },
    AdminLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
  },
});


export const { AdminLoginSuccess, AdminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;