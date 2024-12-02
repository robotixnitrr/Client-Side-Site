import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string | null;
  userid: string | null;
  isAdmin: boolean;
  currentUser: {
    isAdmin: boolean;
  } | null;
}

const initialState: UserState = {
  username: null,
  userid: null,
  isAdmin: false,
  currentUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<[string, string]>) => {
      state.userid = action.payload[0];
      state.username = action.payload[1];
    },
    signInFailure: (state) => {
      state.username = null;
    },
    adminAccess: (state) => {
      state.isAdmin = true;
    },
    logout: (state) => {
      state.username = null;
      state.userid = null;
      state.isAdmin = false;
    },
  },
});

export const { 
  signInSuccess, 
  signInFailure, 
  adminAccess,
  logout
} = userSlice.actions;

export default userSlice.reducer; 