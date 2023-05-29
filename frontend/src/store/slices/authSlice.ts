import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

interface AuthState {
  isAuth: boolean;
  user?: User;
}

const initialState: AuthState = {
  isAuth: false,
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = undefined;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
